'use client'

import { useState } from 'react'
import { Shield, Mail, Phone, Smartphone, Key, ArrowLeft } from 'lucide-react'

interface MFASetupProps {
  user: {
    id: string
    email: string
    phone?: string
  }
  onComplete: () => void
  onCancel: () => void
}

interface MFAVerificationProps {
  user: {
    id: string
    email: string
  }
  onSuccess: () => void
  onCancel: () => void
}

export function MFASetup({ user, onComplete, onCancel }: MFASetupProps) {
  const [step, setStep] = useState<'select' | 'email' | 'sms' | 'authenticator'>('select')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const setupEmailMFA = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/mfa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, method: 'email' })
      })
      
      if (response.ok) {
        setMessage('Email MFA has been enabled for your account.')
        setTimeout(onComplete, 2000)
      } else {
        setMessage('Failed to setup email MFA. Please try again.')
      }
    } catch {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const setupSMSMFA = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/mfa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, method: 'sms' })
      })
      
      if (response.ok) {
        setMessage('SMS MFA has been enabled for your account.')
        setTimeout(onComplete, 2000)
      } else {
        setMessage('Failed to setup SMS MFA. Please try again.')
      }
    } catch {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Setup Multi-Factor Authentication
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Add an extra layer of security to your account
        </p>
      </div>

      {step === 'select' && (
        <div className="space-y-4">
          <button
            onClick={() => setStep('email')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">Email Verification</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Get codes via email</div>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </button>

          <button
            onClick={() => setStep('sms')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-green-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">SMS Verification</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Get codes via text message</div>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </button>

          <button
            onClick={() => setStep('authenticator')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <Smartphone className="w-6 h-6 text-purple-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">Authenticator App</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Use Google Authenticator or similar</div>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </button>
        </div>
      )}

      {step === 'email' && (
        <div className="space-y-4">
          <button
            onClick={() => setStep('select')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to options
          </button>
          
          <div className="text-center">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Verification
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We'll send verification codes to: <strong>{user.email}</strong>
            </p>
            
            <button
              onClick={setupEmailMFA}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Setting up...' : 'Enable Email MFA'}
            </button>
          </div>
        </div>
      )}

      {step === 'sms' && (
        <div className="space-y-4">
          <button
            onClick={() => setStep('select')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to options
          </button>
          
          <div className="text-center">
            <Phone className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              SMS Verification
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Enter your phone number to receive verification codes via SMS
            </p>
            
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            />
            
            <button
              onClick={setupSMSMFA}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Setting up...' : 'Enable SMS MFA'}
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">{message}</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export function MFAVerification({ user, onSuccess, onCancel }: MFAVerificationProps) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [codeRequested, setCodeRequested] = useState(false)

  const requestCode = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/mfa/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, email: user.email })
      })
      
      if (response.ok) {
        setCodeRequested(true)
      } else {
        setError('Failed to send verification code. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async () => {
    if (!code.trim()) {
      setError('Please enter the verification code.')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, code: code.trim() })
      })
      
      const result = await response.json()
      
      if (response.ok && result.valid) {
        onSuccess()
      } else if (result.expired) {
        setError('Code has expired. Please request a new one.')
      } else if (result.tooManyAttempts) {
        setError('Too many attempts. Please request a new code.')
      } else {
        setError('Invalid verification code. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <Key className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify Your Identity
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Enter the verification code sent to your email
        </p>
      </div>

      {!codeRequested ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We'll send a verification code to: <strong>{user.email}</strong>
          </p>
          
          <button
            onClick={requestCode}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-lg tracking-wider"
              maxLength={6}
            />
          </div>

          <button
            onClick={verifyCode}
            disabled={isLoading || !code.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            onClick={requestCode}
            disabled={isLoading}
            className="w-full text-blue-600 hover:text-blue-700 py-2"
          >
            Resend code
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
