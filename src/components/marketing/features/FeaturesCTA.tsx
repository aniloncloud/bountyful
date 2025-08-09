"use client";

export function FeaturesCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-bounce delay-1000" />
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-pulse delay-500" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Main CTA content */}
        <div className="text-center text-white">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white/90 border border-white/20 mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Ready to Transform Your Revenue?
          </div>
          
          {/* Headline */}
          <h2 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Start Your Revenue
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Revolution Today
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-xl text-white/90 md:text-2xl mb-12 leading-relaxed">
            Join 200+ restaurants already using our platform to amplify revenue 
            during <strong>both peak AND slow hours</strong>. Implementation takes just 24-48 hours.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🚀</div>
              <div className="text-2xl font-bold text-green-300 mb-2">+$1,800</div>
              <p className="text-white/80 text-sm">Average monthly revenue increase</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-3">⭐</div>
              <div className="text-2xl font-bold text-blue-300 mb-2">4.9/5</div>
              <p className="text-white/80 text-sm">Restaurant satisfaction rating</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-yellow-300 mb-2">24-48h</div>
              <p className="text-white/80 text-sm">Complete implementation time</p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-green-500/25 transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/40">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started Now
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button className="group inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 px-10 py-5 text-xl font-bold text-white transition-all duration-300 hover:scale-110 hover:bg-white/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
              </svg>
              Schedule Demo
              <span className="text-sm font-normal text-white/70">(15 min)</span>
            </button>
          </div>

          {/* Implementation timeline */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-8">Your 48-Hour Implementation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Day 1: Setup</h4>
                <p className="text-white/70 text-sm">Menu integration, AI training, and account configuration</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">Day 2: Launch</h4>
                <p className="text-white/70 text-sm">Staff training, system testing, and go-live activation</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h4 className="font-semibold mb-2">Results</h4>
                <p className="text-white/70 text-sm">Immediate revenue amplification and optimization begins</p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No upfront costs</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Complete platform access</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>200+ satisfied restaurants</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>24/7 support included</span>
            </div>
          </div>

          {/* Final urgency message */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-green-300">No Setup Fees</span>
            </div>
            <p className="text-white/90">
              <strong>Complete implementation at no upfront cost.</strong>
              <br /> <br />
              Get started immediately with full platform access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}