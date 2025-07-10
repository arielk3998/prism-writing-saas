import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    status: string;
  };
  token?: string;
  error?: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findUnique({ 
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          role: true,
          status: true
        }
      });
      
      if (!user) {
        return { success: false, error: 'Invalid credentials' };
      }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return { success: false, error: 'Invalid credentials' };
      }
      
      const token = jwt.sign(
        { userId: user.id, email: user.email }, 
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );
      
      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...userWithoutPassword } = user;
      
      return { 
        success: true, 
        user: userWithoutPassword, 
        token 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }
  
  static async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { 
          email, 
          password: hashedPassword, 
          name: name || null,
          role: 'CLIENT',
          status: 'ACTIVE'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true
        }
      });
      
      const token = jwt.sign(
        { userId: user.id, email: user.email }, 
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );
      
      return { success: true, user, token };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }
  
  static async verifyToken(token: string): Promise<{ valid: boolean; userId?: string; email?: string }> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string; email: string };
      return { valid: true, userId: decoded.userId, email: decoded.email };
    } catch {
      return { valid: false };
    }
  }

  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        // Return success even if user not found for security
        return { success: true };
      }
      
      // Generate reset token
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const resetExpiry = new Date(Date.now() + 3600000); // 1 hour
      
      await prisma.user.update({
        where: { email },
        data: {
          passwordResetToken: resetToken,
          passwordResetExpires: resetExpiry
        }
      });
      
      // TODO: Send email with reset link
      // For now, just log the reset token
      console.log(`Password reset token for ${email}: ${resetToken}`);
      
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'Password reset failed' };
    }
  }

  static async confirmResetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          passwordResetToken: token,
          passwordResetExpires: {
            gt: new Date()
          }
        }
      });

      if (!user) {
        return { success: false, error: 'Invalid or expired reset token' };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Confirm reset password error:', error);
      return { success: false, error: 'Password reset confirmation failed' };
    }
  }
}
