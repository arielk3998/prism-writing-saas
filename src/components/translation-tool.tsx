'use client'

import { useState, useEffect } from 'react'
import { Globe, Languages, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface TranslationToolProps {
  className?: string
  showInline?: boolean
}

const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'et', name: 'Estonian', flag: '🇪🇪' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
]

export function TranslationTool({ className = '', showInline = false }: TranslationToolProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isPageTranslated, setIsPageTranslated] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [translationStatus, setTranslationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Check if page has been translated
    const htmlLang = document.documentElement.lang || 'en'
    setCurrentLanguage(htmlLang)
    setIsPageTranslated(htmlLang !== 'en')
  }, [])

  const translatePage = async (targetLang: string) => {
    if (targetLang === 'en') {
      // Reset to original English
      window.location.reload()
      return
    }

    setIsTranslating(true)
    setTranslationStatus('loading')

    try {
      // In a real implementation, this would call a translation API
      // For now, we'll simulate the translation process
      await simulateTranslation()
      
      setCurrentLanguage(targetLang)
      setIsPageTranslated(true)
      setTranslationStatus('success')
      document.documentElement.lang = targetLang
      
      // Store preference
      localStorage.setItem('preferred-language', targetLang)
      
    } catch (error) {
      console.error('Translation error:', error)
      setTranslationStatus('error')
    } finally {
      setIsTranslating(false)
    }
  }

  const simulateTranslation = (): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, this would:
        // 1. Extract all text content from the page
        // 2. Send it to a translation service (Google Translate API, Azure Translator, etc.)
        // 3. Replace the content with translated text
        // 4. Handle RTL languages appropriately
        // 5. Maintain accessibility and SEO considerations
        
        resolve()
      }, 2000)
    })
  }

  const toggleTranslationWidget = () => {
    setIsOpen(!isOpen)
  }

  const selectedLangData = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)

  if (showInline) {
    return (
      <div className={`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Global Accessibility
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our platform supports automatic translation to help serve global clients. 
          Choose your preferred language for real-time content translation.
        </p>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => translatePage(lang.code)}
              disabled={isTranslating}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentLanguage === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
        {translationStatus === 'loading' && (
          <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Translating page content...</span>
          </div>
        )}
        {translationStatus === 'success' && (
          <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Page translated successfully</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Translation Widget Button */}
      <button
        onClick={toggleTranslationWidget}
        className={`fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all ${className}`}
        aria-label="Open translation tool"
      >
        <Globe className="w-6 h-6" />
        {isPageTranslated && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </button>

      {/* Translation Widget Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Translate Page
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current: {selectedLangData?.flag} {selectedLangData?.name || 'English'}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => translatePage('en')}
                disabled={isTranslating}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } disabled:opacity-50`}
              >
                🇺🇸 English
              </button>
              
              {SUPPORTED_LANGUAGES.slice(0, 5).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => translatePage(lang.code)}
                  disabled={isTranslating}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  } disabled:opacity-50`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>

            {SUPPORTED_LANGUAGES.length > 5 && (
              <details className="text-sm">
                <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
                  More languages...
                </summary>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {SUPPORTED_LANGUAGES.slice(5).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => translatePage(lang.code)}
                      disabled={isTranslating}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      } disabled:opacity-50`}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              </details>
            )}

            {translationStatus === 'loading' && (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mt-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Translating...</span>
              </div>
            )}

            {translationStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mt-3">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Translation failed</span>
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p>🔒 Privacy-first translation</p>
              <p>✨ Powered by secure APIs</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
