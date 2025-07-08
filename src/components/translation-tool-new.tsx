'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe, Languages, CheckCircle, AlertCircle, Loader2, Search, ChevronDown } from 'lucide-react'

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
  const [isTranslating, setIsTranslating] = useState(false)
  const [isPageTranslated, setIsPageTranslated] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [translationStatus, setTranslationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if page has been translated
    const htmlLang = document.documentElement.lang || 'en'
    setCurrentLanguage(htmlLang)
    setIsPageTranslated(htmlLang !== 'en')
  }, [])

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const translatePage = async (targetLang: string) => {
    if (targetLang === 'en') {
      // Reset to original English
      window.location.reload()
      return
    }

    setIsTranslating(true)
    setTranslationStatus('loading')
    setIsDropdownOpen(false)
    setSearchTerm('')

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
        resolve()
      }, 2000)
    })
  }

  const getCurrentLanguageInfo = () => {
    if (currentLanguage === 'en') {
      return { name: 'English', flag: '🇺🇸' }
    }
    return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || { name: 'English', flag: '🇺🇸' }
  }

  const currentLangInfo = getCurrentLanguageInfo()

  if (showInline) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={isTranslating}
            className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label="Select language for translation"
          >
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium">{currentLangInfo.flag}</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{currentLangInfo.name}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            {isTranslating && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Language List */}
              <div className="max-h-60 overflow-y-auto">
                {/* English Option */}
                <button
                  onClick={() => translatePage('en')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    currentLanguage === 'en' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">🇺🇸</span>
                  <div>
                    <div className="font-medium">English</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Original</div>
                  </div>
                  {currentLanguage === 'en' && <CheckCircle className="w-4 h-4 ml-auto" />}
                </button>

                {/* Filtered Languages */}
                {filteredLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => translatePage(language.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      currentLanguage === language.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{language.code.toUpperCase()}</div>
                    </div>
                    {currentLanguage === language.code && <CheckCircle className="w-4 h-4 ml-auto" />}
                  </button>
                ))}

                {filteredLanguages.length === 0 && searchTerm && (
                  <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">
                    No languages found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Translation Status */}
        {translationStatus === 'success' && (
          <div className="ml-2 flex items-center space-x-1 text-green-600 dark:text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">Translated</span>
          </div>
        )}
        
        {translationStatus === 'error' && (
          <div className="ml-2 flex items-center space-x-1 text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">Error</span>
          </div>
        )}
      </div>
    )
  }

  // Floating widget version
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isTranslating}
          className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          aria-label="Translate page"
        >
          <Globe className="w-5 h-5" />
          <span className="font-medium">{currentLangInfo.flag}</span>
          {isTranslating && <Loader2 className="w-4 h-4 animate-spin" />}
        </button>

        {isDropdownOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Language List */}
            <div className="max-h-60 overflow-y-auto">
              {/* English Option */}
              <button
                onClick={() => translatePage('en')}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentLanguage === 'en' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">🇺🇸</span>
                <div>
                  <div className="font-medium">English</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Original</div>
                </div>
                {currentLanguage === 'en' && <CheckCircle className="w-4 h-4 ml-auto" />}
              </button>

              {/* Filtered Languages */}
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => translatePage(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    currentLanguage === language.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div>
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{language.code.toUpperCase()}</div>
                  </div>
                  {currentLanguage === language.code && <CheckCircle className="w-4 h-4 ml-auto" />}
                </button>
              ))}

              {filteredLanguages.length === 0 && searchTerm && (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">
                  No languages found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Translation Status */}
      {translationStatus === 'success' && (
        <div className="absolute -top-12 right-0 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
          Page translated
        </div>
      )}
      
      {translationStatus === 'error' && (
        <div className="absolute -top-12 right-0 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-xs font-medium">
          Translation failed
        </div>
      )}
    </div>
  )
}
