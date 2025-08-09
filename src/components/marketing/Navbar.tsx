"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-bold text-lg">G2</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link 
            href="#features" 
            className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 hover:scale-105 transform"
          >
            Features
          </Link>
          <Link 
            href="#impact" 
            className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 hover:scale-105 transform"
          >
            Impact
          </Link>
          <Link 
            href="/login" 
            className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 hover:scale-105 transform"
          >
            Login
          </Link>
          <Link href={siteConfig.primaryCta.href}>
            <Button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                {siteConfig.primaryCta.label}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-green-600 md:hidden dark:hover:bg-gray-800"
          onClick={() => setOpen(!open)}
        >
          <div className="relative w-6 h-6">
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${open ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 dark:bg-gray-900/95 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex flex-col gap-4">
              <Link 
                href="#features" 
                onClick={() => setOpen(false)} 
                className="text-gray-600 hover:text-green-600 font-medium py-2 transition-colors duration-200"
              >
                Features
              </Link>
              <Link 
                href="#impact" 
                onClick={() => setOpen(false)} 
                className="text-gray-600 hover:text-green-600 font-medium py-2 transition-colors duration-200"
              >
                Impact
              </Link>
              <Link 
                href="/login" 
                onClick={() => setOpen(false)} 
                className="text-gray-600 hover:text-green-600 font-medium py-2 transition-colors duration-200"
              >
                Login
              </Link>
              <Link href={siteConfig.primaryCta.href} onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-full shadow-lg mt-2">
                  {siteConfig.primaryCta.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


