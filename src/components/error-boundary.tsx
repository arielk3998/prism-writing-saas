'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service (could integrate Sentry here)
    console.error('Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const CustomFallback = this.props.fallback
      
      if (CustomFallback && this.state.error) {
        return (
          <CustomFallback 
            error={this.state.error} 
            reset={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <AlertTriangle className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Our team has been notified.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// HOC for easier use
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
