"use client";

export function FeaturesHero() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      
      {/* Background gradients and decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-30 animate-bounce delay-1000" />
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-25 animate-pulse delay-500" />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Header content */}
        <div className="text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 text-sm font-semibold text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Complete Revenue Amplification Platform
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Beyond Waste Reduction.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revenue Revolution.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl mb-12 leading-relaxed">
            The only platform that transforms <strong>both peak AND slow hours</strong> into revenue opportunities. 
            AI-powered features that amplify earnings <strong>40-60% beyond traditional food waste apps</strong>.
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                +$1,800
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Average Monthly Revenue Increase
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                47%
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Average Cross-Sell Success Rate
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                85%
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Peak Hour Revenue Utilization
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40">
              Calculate Your Revenue Boost
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button className="group inline-flex items-center gap-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
              </svg>
              Watch 3-Min Demo
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">(No signup)</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No upfront costs</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24-48h setup</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 restaurant satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}