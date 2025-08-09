import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Magic Bags", href: "#features" },
      { name: "Analytics", href: "#features" },
      { name: "Pricing", href: "/pricing" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "/contact" },
      { name: "Restaurant Setup", href: "/setup" },
      { name: "API Docs", href: "/docs" },
    ],
    Legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "CCPA", href: "/ccpa" },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-6">
          
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <span className="text-white font-bold text-xl">G2</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Transforming food waste into opportunity. Join 500+ restaurants already making a difference for their bottom line and our planet.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              <a 
                href={siteConfig.social.twitter} 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900 dark:hover:text-green-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={siteConfig.social.linkedin} 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900 dark:hover:text-green-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={siteConfig.social.instagram} 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900 dark:hover:text-green-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.804C4.659 13.909 5.583 12.517 7.26 12.517c1.297 0 2.448.73 3.016 1.804.774 1.275-.15 2.667-1.827 2.667z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Stay updated</h3>
              <p className="text-gray-600 dark:text-gray-400">Get the latest news on food waste reduction and sustainability.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 md:w-64 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full hover:from-green-700 hover:to-emerald-700 transition-colors duration-200 shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              15,000+ meals rescued this week
            </span>
            <span>•</span>
            <span>Made with 💚 for our planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


