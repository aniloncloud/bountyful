"use client";

export function CaseStudies() {
  const caseStudies = [
    {
      restaurant: "Bella Vista Italian",
      type: "Mid-size Family Restaurant",
      location: "San Francisco, CA",
      image: "/api/placeholder/400/300",
      challenge: "Struggling with food waste during slow periods and missing revenue opportunities during peak hours",
      solution: "Implemented hybrid magic bags + peak-time fresh experiences + cross-selling engine",
      results: [
        { metric: "Monthly Revenue", before: "$28,000", after: "$41,200", increase: "+47%" },
        { metric: "Food Waste", before: "32%", after: "8%", increase: "-75%" },
        { metric: "Peak Hour Orders", before: "45/day", after: "78/day", increase: "+73%" },
        { metric: "Average Order Value", before: "$18", after: "$26", increase: "+44%" }
      ],
      testimonial: "This platform completely transformed our business. We're now making more money during slow periods AND peak hours. The cross-selling alone added $800/month.",
      owner: "Marco Benedetti, Owner",
      timeframe: "3 months after implementation"
    },
    {
      restaurant: "Sakura Sushi",
      type: "Premium Sushi Bar",
      location: "Seattle, WA", 
      image: "/api/placeholder/400/300",
      challenge: "High-end ingredients going to waste, difficulty showcasing chef skills during peak capacity",
      solution: "Peak-time menu expansion + AI pricing + chef interaction experiences",
      results: [
        { metric: "Premium Experience Sales", before: "$2,400", after: "$8,900", increase: "+271%" },
        { metric: "Chef Interaction Bookings", before: "0", after: "24/week", increase: "New Revenue" },
        { metric: "Waste Reduction", before: "$1,200/month loss", after: "$200/month loss", increase: "-83%" },
        { metric: "Customer Satisfaction", before: "4.2/5", after: "4.9/5", increase: "+17%" }
      ],
      testimonial: "Our customers love the live sushi-making experiences during peak hours. It's created a whole new revenue stream while showcasing our craftsmanship.",
      owner: "Chef Tanaka, Head Chef",
      timeframe: "4 months after implementation"
    },
    {
      restaurant: "Green Garden Café",
      type: "Health-Focused Fast-Casual",
      location: "Austin, TX",
      image: "/api/placeholder/400/300", 
      challenge: "Seasonal ingredients spoiling quickly, low profit margins on healthy food",
      solution: "Smart timing intelligence + cross-sell optimization + collaboration with local restaurants",
      results: [
        { metric: "Profit Margins", before: "12%", after: "28%", increase: "+133%" },
        { metric: "Cross-Sell Success", before: "8%", after: "52%", increase: "+550%" },
        { metric: "Ingredient Waste", before: "28%", after: "6%", increase: "-79%" },
        { metric: "Monthly Collaboration Revenue", before: "$0", after: "$3,200", increase: "New Stream" }
      ],
      testimonial: "The AI learned our patterns better than we knew them ourselves. Cross-selling healthy add-ons has become our biggest profit driver.",
      owner: "Sarah Martinez, Co-Owner",
      timeframe: "5 months after implementation"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.15)_1px,transparent_0)] [background-size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.1)_1px,transparent_0)]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:from-emerald-900/20 dark:to-teal-900/20 dark:text-emerald-300 mb-6">
            📈 Success Stories
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              Real Restaurants, Real Results
            </span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            See how restaurants are transforming their revenue with our platform
          </p>
        </div>

        {/* Case studies */}
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div 
              key={study.restaurant}
              className={`grid gap-12 lg:grid-cols-2 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              
              {/* Restaurant info & results */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                
                {/* Restaurant header */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {study.restaurant}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                      {study.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {study.location}
                    </span>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Challenge:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Solution:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{study.solution}</p>
                  </div>
                </div>

                {/* Results grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {study.results.map((result, resultIndex) => (
                    <div 
                      key={result.metric}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {result.metric}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">{result.before}</span>
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="font-semibold">{result.after}</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {result.increase}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50">
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                    "{study.testimonial}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {study.owner}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {study.timeframe}
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Restaurant image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🍽️</div>
                        <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
                          {study.restaurant}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {study.type}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating success badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl px-4 py-2 font-bold shadow-lg">
                    Success Story
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-3xl p-12 text-white dark:text-gray-900">
            <h3 className="text-3xl font-bold mb-8">Platform-Wide Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-green-400 dark:text-green-600 mb-2">200+</div>
                <div className="text-lg opacity-90">Restaurants Transformed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 dark:text-blue-600 mb-2">$2.1M</div>
                <div className="text-lg opacity-90">Additional Revenue Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 dark:text-purple-600 mb-2">78%</div>
                <div className="text-lg opacity-90">Average Waste Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 dark:text-orange-600 mb-2">4.9/5</div>
                <div className="text-lg opacity-90">Customer Satisfaction</div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Join These Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}