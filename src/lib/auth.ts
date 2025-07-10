import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-super-secret-jwt-key-minimum-32-characters';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'CLIENT';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  token?: string;
  refreshToken?: string;
}

export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user: AuthUser, expiresIn: string = '24h'): string {
    return jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { 
        expiresIn,
        algorithm: 'HS256'
      }
    );
  }

  // Generate refresh token
  static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  }

  // Verify JWT token
  static verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      throw new Error('Invalid token');
    }
  }

  // Register new user
  static async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return {
          success: false,
          message: 'User already exists with this email'
        };
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
          role: 'CLIENT',
          status: 'ACTIVE'
        }
      });

      // Generate tokens
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
        status: user.status
      };

      const token = this.generateToken(authUser);
      const refreshToken = this.generateRefreshToken(user.id);

      // Store session
      await prisma.userSession.create({
        data: {
          userId: user.id,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });

      return {
        success: true,
        message: 'User registered successfully',
        user: authUser,
        token,
        refreshToken
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed'
      };
    }
  }

  // Login user
  static async login(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<AuthResponse> {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          role: true,
          status: true,
          lockedUntil: true,
          failedLoginAttempts: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        return {
          success: false,
          message: 'Account is temporarily locked. Please try again later.'
        };
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.password);

      if (!isValidPassword) {
        // Increment failed login attempts
        const failedAttempts = user.failedLoginAttempts + 1;
        const updateData: { failedLoginAttempts: number; lockedUntil?: Date } = {
          failedLoginAttempts: failedAttempts
        };

        // Lock account after 5 failed attempts
        if (failedAttempts >= 5) {
          updateData.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        }

        await prisma.user.update({
          where: { id: user.id },
          data: updateData
        });

        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check user status
      if (user.status !== 'ACTIVE') {
        return {
          success: false,
          message: 'Account is not active'
        };
      }

      // Reset failed login attempts and update last login
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockedUntil: null,
          lastLoginAt: new Date()
        }
      });

      // Generate tokens
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
        status: user.status
      };

      const token = this.generateToken(authUser);
      const refreshToken = this.generateRefreshToken(user.id);

      // Store session
      await prisma.userSession.create({
        data: {
          userId: user.id,
          token: refreshToken,
          ipAddress,
          userAgent,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });

      return {
        success: true,
        message: 'Login successful',
        user: authUser,
        token,
        refreshToken
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed'
      };
    }
  }

  // Logout user
  static async logout(token: string): Promise<AuthResponse> {
    try {
      await prisma.userSession.deleteMany({
        where: { token }
      });

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch {
      return {
        success: false,
        message: 'Logout failed'
      };
    }
  }

  // Get user from token
  static async getUserFromToken(token: string): Promise<AuthUser | null> {
    try {
      const decoded = this.verifyToken(token);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user || user.status !== 'ACTIVE') {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
        status: user.status
      };
    } catch {
      return null;
    }
  }

  // Middleware to protect routes
  static async requireAuth(request: NextRequest): Promise<{ user: AuthUser } | NextResponse> {
    try {
      const authHeader = request.headers.get('authorization');
      const token = authHeader?.replace('Bearer ', '');

      if (!token) {
        return NextResponse.json(
          { error: 'No token provided' },
          { status: 401 }
        );
      }

      const user = await this.getUserFromToken(token);

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      return { user };
    } catch {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  }

  // Require admin role
  static async requireAdmin(request: NextRequest): Promise<{ user: AuthUser } | NextResponse> {
    const auth = await this.requireAuth(request);
    
    if (auth instanceof NextResponse) {
      return auth; // Return error response
    }

    if (auth.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return auth;
  }

  // Password reset
  static async requestPasswordReset(email: string): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // Don't reveal that user doesn't exist
        return {
          success: true,
          message: 'If the email exists, you will receive a reset link'
        };
      }

      // Generate reset token
      const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetExpires: resetExpires
        }
      });

      // TODO: Send email with reset link
      // await sendPasswordResetEmail(user.email, resetToken);

      return {
        success: true,
        message: 'If the email exists, you will receive a reset link'
      };
    } catch {
      return {
        success: false,
        message: 'Password reset request failed'
      };
    }
  }

  // Reset password
  static async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      const decoded = this.verifyToken(token);
      
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.userId,
          passwordResetToken: token,
          passwordResetExpires: {
            gt: new Date()
          }
        }
      });

      if (!user) {
        return {
          success: false,
          message: 'Invalid or expired reset token'
        };
      }

      const hashedPassword = await this.hashPassword(newPassword);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
          failedLoginAttempts: 0,
          lockedUntil: null
        }
      });

      // Invalidate all existing sessions
      await prisma.userSession.deleteMany({
        where: { userId: user.id }
      });

      return {
        success: true,
        message: 'Password reset successful'
      };
    } catch {
      return {
        success: false,
        message: 'Password reset failed'
      };
    }
  }
}
