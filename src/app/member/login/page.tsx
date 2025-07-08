'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Shield, Lock, Eye, EyeOff, Users } from 'lucide-react'

interface MemberCredentials {
  email: string
  password: string
  role: 'super_admin' | 'admin_member'
}

// In a real implementation, this would be stored securely in a database
const MEMBER_CREDENTIALS: MemberCredentials[] = [
  {
    email: 'ariel.karagodskiy@gmail.com',
    password: 'PrismSuperAdmin2025!',
    role: 'super_admin'
  },
  {
    email: 'merla.rodriguez@prismwriting.com',
    password: 'PrismAdmin2025!',
    role: 'admin_member'
  },
  {
    email: 'amber.chen@prismwriting.com',
    password: 'PrismAdmin2025!',
    role: 'admin_member'
  },
  {
    email: 'maria.gonzalez@prismwriting.com',
    password: 'PrismAdmin2025!',
    role: 'admin_member'
  }
]

export default function MemberLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [requiresAuth, setRequiresAuth] = useState(false)
  const [authCode, setAuthCode] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Find member credentials
      const member = MEMBER_CREDENTIALS.find(
        m => m.email === email && m.password === password
      )

      if (!member) {
        setError('Invalid member credentials')
        setIsLoading(false)
        return
      }

      // For super admin, require 2FA
      if (member.role === 'super_admin') {
        setRequiresAuth(true)
        setIsLoading(false)
        return
      }

      // Login successful for admin members
      const memberData = {
        email: member.email,
        role: member.role,
        loginTime: new Date().toISOString()
      }

      sessionStorage.setItem('member_data', JSON.stringify(memberData))
      sessionStorage.setItem('member_authenticated', 'true')

      // Redirect to internal dashboard
      window.location.href = '/member/dashboard'

    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate 2FA verification
      // In real implementation, this would verify with Google Authenticator or SMS
      if (authCode === '123456') { // Demo code
        const memberData = {
          email,
          role: 'super_admin' as const,
          loginTime: new Date().toISOString(),
          authVerified: true
        }

        sessionStorage.setItem('member_data', JSON.stringify(memberData))
        sessionStorage.setItem('member_authenticated', 'true')

        // Redirect to super admin dashboard
        window.location.href = '/admin/dashboard'
      } else {
        setError('Invalid authentication code')
      }
    } catch (error) {
      setError('Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  if (requiresAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="flex items-center justify-center min-h-screen pt-16">
          <div className="max-w-md w-full space-y-8 p-8">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-red-600" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                Two-Factor Authentication
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter the authentication code from your authenticator app
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleAuthVerification}>
              <div>
                <label htmlFor="auth-code" className="sr-only">
                  Authentication Code
                </label>
                <input
                  id="auth-code"
                  name="auth-code"
                  type="text"
                  required
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setRequiresAuth(false)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Member Portal
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to access internal resources and templates
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="Member email address"
                />
              </div>
              
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="Member password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                </span>
                {isLoading ? 'Signing in...' : 'Sign in to Member Portal'}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Super Admin requires 2FA verification
              </p>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
