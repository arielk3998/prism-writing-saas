import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">Prism Writing</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Professional technical writing and documentation services. 
              Specialized expertise for aviation, healthcare, and compliance industries.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/portfolio#aviation" className="hover:text-white transition-colors">Aviation Documentation</Link></li>
              <li><Link href="/portfolio#compliance" className="hover:text-white transition-colors">Compliance Documentation</Link></li>
              <li><Link href="/portfolio#technical" className="hover:text-white transition-colors">Technical Writing</Link></li>
              <li><Link href="/portfolio#quality" className="hover:text-white transition-colors">Quality Assurance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/client" className="hover:text-white transition-colors">Client Portal</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Prism Writing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
