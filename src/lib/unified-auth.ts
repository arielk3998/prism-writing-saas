import { NextRequest } from 'next/server'

export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'customer'
  company?: string
  permissions: string[]
  canBeRemoved: boolean
}

// Super admin configuration - this user cannot be removed
const SUPER_ADMIN: User = {
  id: 'super_admin_001',
  email: 'Ariel.pk@outlook.com',
  name: 'Ariel',
  role: 'super_admin',
  permissions: ['*'], // All permissions
  canBeRemoved: false
}

const SUPER_ADMIN_PASSWORD = '$GoodTimes2025!'

// Mock user database - in production, this would be in a real database
const users: User[] = [
  SUPER_ADMIN,
  // Example customer
  {
    id: 'customer_001',
    email: 'demo@example.com',
    name: 'Demo Customer',
    role: 'customer',
    company: 'Demo Company',
    permissions: ['view_documents', 'view_projects', 'contact_support'],
    canBeRemoved: true
  }
]

export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  if (!user) {
    return { success: false, message: 'User not found' }
  }

  // For super admin, check the special password
  if (user.role === 'super_admin') {
    if (password === SUPER_ADMIN_PASSWORD) {
      return { success: true, user }
    } else {
      return { success: false, message: 'Invalid credentials' }
    }
  }

  // For other users, you would typically hash and compare passwords
  // For demo purposes, using simple password check
  if (password === 'demo123' || password === SUPER_ADMIN_PASSWORD) {
    return { success: true, user }
  }

  return { success: false, message: 'Invalid credentials' }
}

export function getUserPermissions(user: User): string[] {
  if (user.role === 'super_admin') {
    return ['*'] // All permissions
  }
  return user.permissions
}

export function hasPermission(user: User, permission: string): boolean {
  const permissions = getUserPermissions(user)
  return permissions.includes('*') || permissions.includes(permission)
}

export function canManageUsers(user: User): boolean {
  return user.role === 'super_admin' || user.role === 'admin'
}

export function canRemoveUser(requester: User, target: User): boolean {
  // Super admin can remove anyone except themselves
  if (requester.role === 'super_admin') {
    return target.canBeRemoved
  }
  
  // Regular admins can only remove customers
  if (requester.role === 'admin') {
    return target.role === 'customer' && target.canBeRemoved
  }
  
  return false
}

export async function createUser(requester: User, userData: Partial<User>): Promise<{ success: boolean; user?: User; message?: string }> {
  if (!canManageUsers(requester)) {
    return { success: false, message: 'Insufficient permissions' }
  }

  // Only super admin can create admins
  if (userData.role === 'admin' && requester.role !== 'super_admin') {
    return { success: false, message: 'Only super admin can create admin users' }
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    email: userData.email || '',
    name: userData.name || '',
    role: userData.role || 'customer',
    company: userData.company,
    permissions: userData.permissions || getDefaultPermissions(userData.role || 'customer'),
    canBeRemoved: true
  }

  // Check if email already exists
  if (users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
    return { success: false, message: 'Email already exists' }
  }

  users.push(newUser)
  return { success: true, user: newUser }
}

function getDefaultPermissions(role: 'admin' | 'customer'): string[] {
  switch (role) {
    case 'admin':
      return ['manage_leads', 'view_analytics', 'manage_customers', 'view_documents']
    case 'customer':
      return ['view_documents', 'view_projects', 'contact_support']
    default:
      return []
  }
}

export function verifySession(request: NextRequest): { valid: boolean; user?: User } {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false }
  }

  const token = authHeader.substring(7)
  
  // In a real app, you'd verify JWT tokens
  // For demo, we'll decode a simple base64 token
  try {
    const userData = JSON.parse(atob(token))
    const user = users.find(u => u.id === userData.id && u.email === userData.email)
    
    if (user) {
      return { valid: true, user }
    }
  } catch {
    // Invalid token
  }
  
  return { valid: false }
}

export function createSessionToken(user: User): string {
  // In a real app, you'd use JWT with proper signing
  // For demo, using base64 encoding
  return btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }))
}
