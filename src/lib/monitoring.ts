// Enterprise-grade monitoring and logging system

interface LogEvent {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  timestamp: string
  context?: Record<string, unknown>
  userId?: string
  sessionId?: string
}

interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
  userId?: string
  timestamp: string
}

interface PerformanceMetric {
  name: string
  value: number
  timestamp: string
  context?: Record<string, unknown>
}

class MonitoringService {
  private sessionId: string
  private userId?: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializePerformanceObserver()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializePerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.trackPerformance({
              name: entry.name,
              value: entry.duration || (entry as PerformanceResourceTiming).transferSize || 0,
              timestamp: new Date().toISOString(),
              context: {
                type: entry.entryType,
                startTime: entry.startTime,
              }
            })
          }
        })

        observer.observe({ entryTypes: ['navigation', 'resource', 'measure'] })
      } catch (error) {
        console.warn('Performance monitoring not available:', error)
      }
    }
  }

  // Logging methods
  log(level: LogEvent['level'], message: string, context?: Record<string, unknown>) {
    const event: LogEvent = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      userId: this.userId,
      sessionId: this.sessionId,
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console[level](event)
    }

    // In production, send to external service (e.g., Sentry, LogRocket)
    this.sendToExternalService('log', event)
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log('error', message, {
      ...context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    })
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context)
  }

  // Analytics methods
  trackEvent(event: string, properties?: Record<string, unknown>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      userId: this.userId,
      timestamp: new Date().toISOString(),
    }

    this.sendToExternalService('analytics', analyticsEvent)
  }

  trackPageView(page: string, properties?: Record<string, unknown>) {
    this.trackEvent('page_view', {
      page,
      ...properties,
    })
  }

  trackUserAction(action: string, properties?: Record<string, unknown>) {
    this.trackEvent('user_action', {
      action,
      ...properties,
    })
  }

  // Performance monitoring
  trackPerformance(metric: PerformanceMetric) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Performance metric:', metric)
    }

    this.sendToExternalService('performance', metric)
  }

  measureTime<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    
    return fn().finally(() => {
      const duration = performance.now() - start
      this.trackPerformance({
        name,
        value: duration,
        timestamp: new Date().toISOString(),
      })
    })
  }

  // User management
  setUserId(userId: string) {
    this.userId = userId
  }

  clearUserId() {
    this.userId = undefined
  }

  // Error reporting
  reportError(error: Error, context?: Record<string, unknown>) {
    this.error(`Unhandled error: ${error.message}`, error, {
      ...context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    })
  }

  // External service integration
  private async sendToExternalService(type: string, data: unknown) {
    try {
      // In a real application, you would send this to your monitoring service
      // Examples: Sentry, LogRocket, DataDog, New Relic, etc.
      
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to your logging endpoint
        await fetch('/api/monitoring', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type,
            data,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {
          // Silently fail to avoid infinite loops
        })
      }
    } catch {
      // Silently fail to avoid infinite loops
    }
  }

  // Business metrics
  trackBusinessMetric(metric: string, value: number, properties?: Record<string, unknown>) {
    this.trackEvent('business_metric', {
      metric,
      value,
      ...properties,
    })
  }

  trackConversion(type: string, value?: number, properties?: Record<string, unknown>) {
    this.trackEvent('conversion', {
      type,
      value,
      ...properties,
    })
  }

  trackUserInteraction(element: string, action: string, properties?: Record<string, unknown>) {
    this.trackEvent('user_interaction', {
      element,
      action,
      ...properties,
    })
  }
}

// Singleton instance
export const monitoring = new MonitoringService()

// React hooks for easy usage
export function useMonitoring() {
  return monitoring
}

export default monitoring
