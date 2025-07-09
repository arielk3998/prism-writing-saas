import { prisma } from '@/lib/prisma';
import { Project, Task, Milestone, ProjectDocument, Communication, Prisma, ProjectStatus } from '@prisma/client';

export interface CreateProjectRequest {
  title: string;
  description?: string;
  clientId: string;
  status?: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  currency?: string;
}

export interface CreateTaskRequest {
  projectId: string;
  title: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: Date;
  estimatedHours?: number;
  assigneeId?: string;
}

export interface CreateMilestoneRequest {
  projectId: string;
  title: string;
  description?: string;
  dueDate?: Date;
}

export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  totalBudget: number;
  projectsByStatus: Record<string, number>;
  taskCompletionRate: number;
  averageProjectDuration: number;
}

export class ProjectManagementService {
  // CREATE PROJECT
  static async createProject(data: CreateProjectRequest): Promise<Project> {
    try {
      const project = await prisma.project.create({
        data: {
          title: data.title,
          description: data.description,
          clientId: data.clientId,
          status: data.status || 'PLANNING',
          startDate: data.startDate,
          dueDate: data.endDate,
          budget: data.budget,
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });

      // Create initial milestone for project kickoff
      await this.createMilestone({
        projectId: project.id,
        title: 'Project Kickoff',
        description: 'Initial project setup and client onboarding',
        dueDate: data.startDate || new Date(),
      });

      // Log communication
      await this.addCommunication({
        projectId: project.id,
        senderId: 'system', // System generated
        recipientId: data.clientId,
        subject: `Project Created: ${data.title}`,
        message: `Your project "${data.title}" has been created and is now in ${data.status || 'PLANNING'} phase.`,
        type: 'NOTIFICATION',
      });

      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // UPDATE PROJECT
  static async updateProject(projectId: string, data: Partial<CreateProjectRequest>): Promise<Project> {
    try {
      const project = await prisma.project.update({
        where: { id: projectId },
        data: {
          title: data.title,
          description: data.description,
          status: data.status,
          startDate: data.startDate,
          dueDate: data.endDate,
          budget: data.budget,
          ...(data.status === 'COMPLETED' && { completedAt: new Date() }),
        },
        include: {
          client: true,
          tasks: true,
          milestones: true,
        }
      });

      // Log status change
      if (data.status) {
        await this.addCommunication({
          projectId,
          senderId: 'system',
          recipientId: project.clientId,
          subject: `Project Status Updated: ${project.title}`,
          message: `Your project status has been updated to: ${data.status}`,
          type: 'UPDATE',
        });
      }

      return project;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // GET PROJECTS
  static async getProjects(filters: {
    clientId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    try {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const skip = (page - 1) * limit;

      const where = {} as Prisma.ProjectWhereInput;

      if (filters.clientId) where.clientId = filters.clientId;
      if (filters.status) where.status = filters.status as ProjectStatus;

      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { description: { contains: filters.search } },
        ];
      }

      const [projects, total] = await Promise.all([
        prisma.project.findMany({
          where,
          include: {
            client: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            },
            tasks: {
              where: { status: { not: 'COMPLETED' } },
              take: 5,
              orderBy: { dueDate: 'asc' }
            },
            milestones: {
              where: { isCompleted: false },
              take: 3,
              orderBy: { dueDate: 'asc' }
            },
            _count: {
              select: {
                tasks: true,
                documents: true,
                communications: true,
              }
            }
          },
          orderBy: [
            { status: 'asc' },
            { createdAt: 'desc' }
          ],
          skip,
          take: limit,
        }),
        prisma.project.count({ where })
      ]);

      return {
        projects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // CREATE TASK
  static async createTask(data: CreateTaskRequest): Promise<Task> {
    try {
      const task = await prisma.task.create({
        data: {
          projectId: data.projectId,
          title: data.title,
          description: data.description,
          priority: data.priority || 'MEDIUM',
          dueDate: data.dueDate,
          estimatedHours: data.estimatedHours,
          assigneeId: data.assigneeId,
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          project: {
            select: {
              id: true,
              title: true,
              clientId: true,
            }
          }
        }
      });

      // Notify assignee if assigned
      if (data.assigneeId) {
        await this.addCommunication({
          projectId: data.projectId,
          senderId: 'system',
          recipientId: data.assigneeId,
          subject: `New Task Assigned: ${data.title}`,
          message: `You have been assigned a new task: "${data.title}" with priority: ${data.priority}`,
          type: 'NOTIFICATION',
        });
      }

      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // UPDATE TASK
  static async updateTask(taskId: string, data: {
    title?: string;
    description?: string;
    status?: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    dueDate?: Date;
    estimatedHours?: number;
    actualHours?: number;
    assigneeId?: string;
  }): Promise<Task> {
    try {
      const task = await prisma.task.update({
        where: { id: taskId },
        data: {
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate,
          estimatedHours: data.estimatedHours,
          actualHours: data.actualHours,
          assigneeId: data.assigneeId,
          ...(data.status === 'COMPLETED' && { completedAt: new Date() }),
        },
        include: {
          project: true,
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });

      // Notify on completion
      if (data.status === 'COMPLETED') {
        await this.addCommunication({
          projectId: task.projectId,
          senderId: 'system',
          recipientId: task.project.clientId,
          subject: `Task Completed: ${task.title}`,
          message: `Task "${task.title}" has been completed.`,
          type: 'UPDATE',
        });
      }

      return task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // CREATE MILESTONE
  static async createMilestone(data: CreateMilestoneRequest): Promise<Milestone> {
    try {
      return await prisma.milestone.create({
        data: {
          projectId: data.projectId,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
        }
      });
    } catch (error) {
      console.error('Error creating milestone:', error);
      throw error;
    }
  }

  // COMPLETE MILESTONE
  static async completeMilestone(milestoneId: string): Promise<Milestone> {
    try {
      const milestone = await prisma.milestone.update({
        where: { id: milestoneId },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
        include: {
          project: true,
        }
      });

      // Notify client
      await this.addCommunication({
        projectId: milestone.projectId,
        senderId: 'system',
        recipientId: milestone.project.clientId,
        subject: `Milestone Completed: ${milestone.title}`,
        message: `Milestone "${milestone.title}" has been completed for project "${milestone.project.title}".`,
        type: 'UPDATE',
      });

      return milestone;
    } catch (error) {
      console.error('Error completing milestone:', error);
      throw error;
    }
  }

  // UPLOAD PROJECT DOCUMENT
  static async uploadDocument(data: {
    projectId: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize?: number;
    uploadedById: string;
    isClientVisible?: boolean;
    version?: string;
  }): Promise<ProjectDocument> {
    try {
      const document = await prisma.projectDocument.create({
        data: {
          projectId: data.projectId,
          title: data.title,
          description: data.description,
          fileUrl: data.fileUrl,
          fileType: data.fileType,
          fileSize: data.fileSize,
          uploadedById: data.uploadedById,
          isClientVisible: data.isClientVisible ?? true,
          version: data.version || '1.0',
        },
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          project: {
            select: {
              id: true,
              title: true,
              clientId: true,
            }
          }
        }
      });

      // Notify if client visible
      if (data.isClientVisible) {
        await this.addCommunication({
          projectId: data.projectId,
          senderId: data.uploadedById,
          recipientId: document.project.clientId,
          subject: `New Document: ${data.title}`,
          message: `A new document "${data.title}" has been added to your project.`,
          type: 'NOTIFICATION',
        });
      }

      return document;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  // ADD COMMUNICATION
  static async addCommunication(data: {
    projectId: string;
    senderId: string;
    recipientId: string;
    subject: string;
    message: string;
    type?: 'MESSAGE' | 'UPDATE' | 'NOTIFICATION' | 'ALERT';
  }): Promise<Communication> {
    try {
      return await prisma.communication.create({
        data: {
          projectId: data.projectId,
          senderId: data.senderId,
          recipientId: data.recipientId,
          subject: data.subject,
          message: data.message,
          type: data.type || 'MESSAGE',
        }
      });
    } catch (error) {
      console.error('Error adding communication:', error);
      throw error;
    }
  }

  // GET PROJECT TIMELINE
  static async getProjectTimeline(projectId: string) {
    try {
      const [tasks, milestones, communications, documents] = await Promise.all([
        prisma.task.findMany({
          where: { projectId },
          include: {
            assignee: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        }),
        prisma.milestone.findMany({
          where: { projectId },
          orderBy: { dueDate: 'asc' }
        }),
        prisma.communication.findMany({
          where: { projectId },
          include: {
            sender: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 20
        }),
        prisma.projectDocument.findMany({
          where: { projectId, isClientVisible: true },
          include: {
            uploadedBy: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
      ]);

      return {
        tasks,
        milestones,
        communications,
        documents
      };
    } catch (error) {
      console.error('Error fetching project timeline:', error);
      throw error;
    }
  }

  // GET PROJECT METRICS
  static async getProjectMetrics(): Promise<ProjectMetrics> {
    try {
      const [
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        completedTasks,
        overdueTasks,
        projectsByStatus,
        budgetData
      ] = await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { status: 'ACTIVE' } }),
        prisma.project.count({ where: { status: 'COMPLETED' } }),
        prisma.task.count(),
        prisma.task.count({ where: { status: 'COMPLETED' } }),
        prisma.task.count({
          where: {
            dueDate: { lt: new Date() },
            status: { not: 'COMPLETED' }
          }
        }),
        prisma.project.groupBy({
          by: ['status'],
          _count: { id: true },
        }),
        prisma.project.aggregate({
          _sum: { budget: true },
        }),
      ]);

      const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const totalBudget = budgetData._sum.budget || 0;

      return {
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        completedTasks,
        overdueTasks,
        totalBudget,
        projectsByStatus: projectsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
        taskCompletionRate: Math.round(taskCompletionRate * 100) / 100,
        averageProjectDuration: 0, // TODO: Calculate based on completed projects
      };
    } catch (error) {
      console.error('Error fetching project metrics:', error);
      throw error;
    }
  }

  // TIME TRACKING
  static async logTimeEntry(data: {
    taskId: string;
    userId: string;
    hours: number;
    description?: string;
    date?: Date;
  }): Promise<void> {
    try {
      // Update task actual hours
      const task = await prisma.task.findUnique({
        where: { id: data.taskId },
        select: { actualHours: true }
      });

      await prisma.task.update({
        where: { id: data.taskId },
        data: {
          actualHours: (task?.actualHours || 0) + data.hours
        }
      });

      // Could also store in a separate TimeEntry table for detailed tracking
      console.log(`Time logged: ${data.hours} hours for task ${data.taskId}`);
    } catch (error) {
      console.error('Error logging time entry:', error);
      throw error;
    }
  }

  // PROJECT SEARCH
  static async searchProjects(query: string, userId?: string) {
    try {
      const baseWhere = {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          {
            client: {
              OR: [
                { name: { contains: query } },
                { email: { contains: query } },
              ]
            }
          }
        ]
      };

      const where = userId ? {
        AND: [
          baseWhere,
          {
            tasks: {
              some: {
                assigneeId: userId
              }
            }
          }
        ]
      } : baseWhere;

      return await prisma.project.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          _count: {
            select: {
              tasks: true,
              documents: true,
            }
          }
        },
        take: 10,
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  }
}
