import { prisma } from '@/lib/prisma';
import { Document, DocumentVersion, DocumentComment, DocumentShare } from '@prisma/client';

export interface CreateDocumentRequest {
  title: string;
  description?: string;
  content?: string;
  category: 'TECHNICAL_WRITING' | 'BUSINESS_WRITING' | 'CONTENT_WRITING' | 'COPYWRITING' | 'DOCUMENTATION' | 'PROPOSAL' | 'REPORT' | 'OTHER';
  type: 'SAMPLE' | 'TEMPLATE' | 'GUIDE' | 'CASE_STUDY' | 'PORTFOLIO_PIECE';
  authorId: string;
  isTemplate?: boolean;
  isPublic?: boolean;
  isPremium?: boolean;
}

export interface ShareDocumentRequest {
  documentId: string;
  sharedWith: string; // Email or user ID
  permissions: {
    read: boolean;
    write: boolean;
    comment: boolean;
    admin: boolean;
  };
  expiresAt?: Date;
  createdBy: string;
}

export interface DocumentCommentRequest {
  documentId: string;
  content: string;
  authorId: string;
  parentId?: string;
}

export interface DocumentOperation {
  type: 'INSERT' | 'DELETE' | 'RETAIN';
  data?: string;
  length?: number;
  position?: number;
}

export class DocumentCollaborationService {
  // CREATE DOCUMENT
  static async createDocument(data: CreateDocumentRequest): Promise<Document> {
    try {
      const document = await prisma.document.create({
        data: {
          title: data.title,
          description: data.description,
          content: data.content || '',
          category: data.category,
          type: data.type,
          authorId: data.authorId,
          isTemplate: data.isTemplate || false,
          isPublic: data.isPublic || false,
          isPremium: data.isPremium || false,
          status: 'DRAFT',
          version: '1.0',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });

      // Create initial version
      await this.createVersion(document.id, {
        versionNumber: '1.0',
        title: data.title,
        content: data.content || '',
        changeLog: 'Initial version',
        createdBy: data.authorId,
      });

      return document;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // UPDATE DOCUMENT CONTENT
  static async updateDocumentContent(
    documentId: string, 
    content: string, 
    userId: string,
    operations?: DocumentOperation[]
  ): Promise<Document> {
    try {
      // Check if document is locked by another user
      const document = await prisma.document.findUnique({
        where: { id: documentId },
        select: { isLocked: true, lockedBy: true, version: true }
      });

      if (document?.isLocked && document.lockedBy !== userId) {
        throw new Error('Document is currently being edited by another user');
      }

      // Update document
      const updatedDocument = await prisma.document.update({
        where: { id: documentId },
        data: {
          content,
          updatedAt: new Date(),
        },
        include: {
          author: true,
          versions: {
            orderBy: { createdAt: 'desc' },
            take: 5
          }
        }
      });

      // Store revision operations for real-time collaboration
      if (operations) {
        await Promise.all(
          operations.map(op => 
            prisma.documentRevision.create({
              data: {
                documentId,
                operation: op.type,
                delta: JSON.stringify(op),
                authorId: userId,
              }
            })
          )
        );
      }

      return updatedDocument;
    } catch (error) {
      console.error('Error updating document content:', error);
      throw error;
    }
  }

  // LOCK DOCUMENT FOR EDITING
  static async lockDocument(documentId: string, userId: string): Promise<boolean> {
    try {
      const document = await prisma.document.findUnique({
        where: { id: documentId },
        select: { isLocked: true, lockedBy: true, lockedAt: true }
      });

      // Check if already locked by someone else
      if (document?.isLocked && document.lockedBy !== userId) {
        // Check if lock is stale (older than 30 minutes)
        const lockAge = document.lockedAt ? Date.now() - document.lockedAt.getTime() : 0;
        if (lockAge < 30 * 60 * 1000) { // 30 minutes
          return false;
        }
      }

      await prisma.document.update({
        where: { id: documentId },
        data: {
          isLocked: true,
          lockedBy: userId,
          lockedAt: new Date(),
        }
      });

      return true;
    } catch (error) {
      console.error('Error locking document:', error);
      return false;
    }
  }

  // UNLOCK DOCUMENT
  static async unlockDocument(documentId: string, userId: string): Promise<void> {
    try {
      await prisma.document.updateMany({
        where: {
          id: documentId,
          lockedBy: userId, // Only unlock if locked by this user
        },
        data: {
          isLocked: false,
          lockedBy: null,
          lockedAt: null,
        }
      });
    } catch (error) {
      console.error('Error unlocking document:', error);
    }
  }

  // CREATE VERSION
  static async createVersion(documentId: string, data: {
    versionNumber: string;
    title: string;
    content: string;
    changeLog?: string;
    createdBy: string;
  }): Promise<DocumentVersion> {
    try {
      return await prisma.documentVersion.create({
        data: {
          documentId,
          versionNumber: data.versionNumber,
          title: data.title,
          content: data.content,
          changeLog: data.changeLog,
          createdBy: data.createdBy,
        }
      });
    } catch (error) {
      console.error('Error creating version:', error);
      throw error;
    }
  }

  // SHARE DOCUMENT
  static async shareDocument(data: ShareDocumentRequest): Promise<DocumentShare> {
    try {
      // Check if already shared with this user/email
      const existingShare = await prisma.documentShare.findFirst({
        where: {
          documentId: data.documentId,
          sharedWith: data.sharedWith,
        }
      });

      if (existingShare) {
        // Update existing share
        return await prisma.documentShare.update({
          where: { id: existingShare.id },
          data: {
            permissions: JSON.stringify(data.permissions),
            expiresAt: data.expiresAt,
          }
        });
      }

      return await prisma.documentShare.create({
        data: {
          documentId: data.documentId,
          sharedWith: data.sharedWith,
          permissions: JSON.stringify(data.permissions),
          expiresAt: data.expiresAt,
          createdBy: data.createdBy,
        }
      });
    } catch (error) {
      console.error('Error sharing document:', error);
      throw error;
    }
  }

  // ADD COMMENT
  static async addComment(data: DocumentCommentRequest): Promise<DocumentComment> {
    try {
      const comment = await prisma.documentComment.create({
        data: {
          documentId: data.documentId,
          content: data.content,
          authorId: data.authorId,
          parentId: data.parentId,
        },
        include: {
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                }
              }
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });

      return comment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // RESOLVE COMMENT
  static async resolveComment(commentId: string): Promise<DocumentComment> {
    try {
      return await prisma.documentComment.update({
        where: { id: commentId },
        data: { isResolved: true }
      });
    } catch (error) {
      console.error('Error resolving comment:', error);
      throw error;
    }
  }

  // GET DOCUMENT WITH COLLABORATION DATA
  static async getDocumentWithCollaboration(documentId: string, userId?: string) {
    try {
      const document = await prisma.document.findUnique({
        where: { id: documentId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          versions: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          comments: {
            where: { parentId: null }, // Only top-level comments
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                }
              },
              replies: {
                include: {
                  author: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    }
                  }
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          shares: {
            where: {
              OR: [
                { expiresAt: null },
                { expiresAt: { gt: new Date() } }
              ]
            }
          }
        }
      });

      if (!document) {
        throw new Error('Document not found');
      }

      // Check access permissions
      const hasAccess = await this.checkDocumentAccess(documentId, userId);
      if (!hasAccess.canRead) {
        throw new Error('Access denied');
      }

      return {
        document,
        permissions: hasAccess
      };
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  // CHECK DOCUMENT ACCESS
  static async checkDocumentAccess(documentId: string, userId?: string) {
    try {
      const document = await prisma.document.findUnique({
        where: { id: documentId },
        include: {
          shares: {
            where: {
              OR: [
                { expiresAt: null },
                { expiresAt: { gt: new Date() } }
              ]
            }
          }
        }
      });

      if (!document) {
        return { canRead: false, canWrite: false, canComment: false, canAdmin: false };
      }

      // Public documents are readable by all
      if (document.isPublic) {
        return { canRead: true, canWrite: false, canComment: true, canAdmin: false };
      }

      // Author has full access
      if (document.authorId === userId) {
        return { canRead: true, canWrite: true, canComment: true, canAdmin: true };
      }

      // Check shares
      if (userId) {
        const share = document.shares.find(s => s.sharedWith === userId);
        if (share) {
          const permissions = JSON.parse(share.permissions);
          return {
            canRead: permissions.read,
            canWrite: permissions.write,
            canComment: permissions.comment,
            canAdmin: permissions.admin
          };
        }
      }

      return { canRead: false, canWrite: false, canComment: false, canAdmin: false };
    } catch (error) {
      console.error('Error checking document access:', error);
      return { canRead: false, canWrite: false, canComment: false, canAdmin: false };
    }
  }

  // SEARCH DOCUMENTS
  static async searchDocuments(query: string, filters: {
    category?: string;
    type?: string;
    authorId?: string;
    isPublic?: boolean;
    isTemplate?: boolean;
    userId?: string;
    page?: number;
    limit?: number;
  } = {}) {
    try {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const skip = (page - 1) * limit;

      const where: any = {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ]
      };

      // Apply filters
      if (filters.category) where.category = filters.category;
      if (filters.type) where.type = filters.type;
      if (filters.authorId) where.authorId = filters.authorId;
      if (filters.isPublic !== undefined) where.isPublic = filters.isPublic;
      if (filters.isTemplate !== undefined) where.isTemplate = filters.isTemplate;

      // Add access control
      if (filters.userId) {
        where.OR.push(
          { authorId: filters.userId }, // Own documents
          { shares: { some: { sharedWith: filters.userId } } } // Shared documents
        );
      } else {
        where.isPublic = true; // Only public documents for anonymous users
      }

      const [documents, total] = await Promise.all([
        prisma.document.findMany({
          where,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            },
            _count: {
              select: {
                comments: true,
                shares: true,
                versions: true,
              }
            }
          },
          orderBy: [
            { isPremium: 'desc' },
            { updatedAt: 'desc' }
          ],
          skip,
          take: limit,
        }),
        prisma.document.count({ where })
      ]);

      return {
        documents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }

  // GET DOCUMENT TEMPLATES
  static async getTemplates(category?: string) {
    try {
      const where: any = {
        isTemplate: true,
        isPublic: true,
      };

      if (category) where.category = category;

      return await prisma.document.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          _count: {
            select: {
              comments: true,
              shares: true,
            }
          }
        },
        orderBy: [
          { isPremium: 'desc' },
          { createdAt: 'desc' }
        ]
      });
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  }

  // DUPLICATE DOCUMENT (Create from template)
  static async duplicateDocument(documentId: string, userId: string, title?: string): Promise<Document> {
    try {
      const original = await prisma.document.findUnique({
        where: { id: documentId }
      });

      if (!original) {
        throw new Error('Document not found');
      }

      // Check access
      const access = await this.checkDocumentAccess(documentId, userId);
      if (!access.canRead) {
        throw new Error('Access denied');
      }

      return await this.createDocument({
        title: title || `Copy of ${original.title}`,
        description: original.description || undefined,
        content: original.content || undefined,
        category: original.category,
        type: original.type,
        authorId: userId,
        isTemplate: false,
        isPublic: false,
        isPremium: false,
      });
    } catch (error) {
      console.error('Error duplicating document:', error);
      throw error;
    }
  }

  // GET RECENT REVISIONS (for operational transform)
  static async getRecentRevisions(documentId: string, since: Date) {
    try {
      return await prisma.documentRevision.findMany({
        where: {
          documentId,
          timestamp: { gt: since }
        },
        orderBy: { timestamp: 'asc' }
      });
    } catch (error) {
      console.error('Error fetching revisions:', error);
      throw error;
    }
  }

  // EXPORT DOCUMENT
  static async exportDocument(documentId: string, format: 'markdown' | 'html' | 'pdf' = 'markdown'): Promise<string> {
    try {
      const document = await prisma.document.findUnique({
        where: { id: documentId },
        select: { title: true, content: true }
      });

      if (!document) {
        throw new Error('Document not found');
      }

      switch (format) {
        case 'markdown':
          return `# ${document.title}\n\n${document.content}`;
        case 'html':
          return `<!DOCTYPE html>
<html>
<head><title>${document.title}</title></head>
<body>
<h1>${document.title}</h1>
<div>${document.content}</div>
</body>
</html>`;
        case 'pdf':
          // TODO: Implement PDF export using a library like Puppeteer
          throw new Error('PDF export not implemented yet');
        default:
          return document.content || '';
      }
    } catch (error) {
      console.error('Error exporting document:', error);
      throw error;
    }
  }
}
