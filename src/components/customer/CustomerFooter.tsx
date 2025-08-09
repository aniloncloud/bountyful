import Link from "next/link";
import { siteConfig } from "@/config/site";

export function CustomerFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{siteConfig.shortName?.slice(0,3)}</span>
              </div>
              <span className="font-bold text-xl">{siteConfig.shortName}</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Maximizing restaurant revenue during ALL hours. Fresh experiences + surplus optimization.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.120.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.789-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/></svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Customers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-gray-300 hover:text-green-500 transition-colors">Browse Restaurants</Link></li>
              <li><Link href="/shop/how-it-works" className="text-gray-300 hover:text-green-500 transition-colors">How It Works</Link></li>
              <li><Link href="/shop/fresh-experiences" className="text-gray-300 hover:text-green-500 transition-colors">Fresh Experiences</Link></li>
              <li><Link href="/shop/surplus-bags" className="text-gray-300 hover:text-green-500 transition-colors">Surplus Bags</Link></li>
              <li><Link href="/shop/support" className="text-gray-300 hover:text-green-500 transition-colors">Customer Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Restaurants</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/signup" className="text-gray-300 hover:text-green-500 transition-colors">Partner With Us</Link></li>
              <li><Link href="/features" className="text-gray-300 hover:text-green-500 transition-colors">Revenue Amplification</Link></li>
              <li><Link href="/peak-optimization" className="text-gray-300 hover:text-green-500 transition-colors">Peak Hour Optimization</Link></li>
              <li><Link href="/analytics" className="text-gray-300 hover:text-green-500 transition-colors">Analytics Dashboard</Link></li>
              <li><Link href="/support" className="text-gray-300 hover:text-green-500 transition-colors">Restaurant Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Impact</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/impact" className="text-gray-300 hover:text-green-500 transition-colors">Environmental Impact</Link></li>
              <li><Link href="/community" className="text-gray-300 hover:text-green-500 transition-colors">Community Partners</Link></li>
              <li><Link href="/sustainability" className="text-gray-300 hover:text-green-500 transition-colors">Sustainability Report</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-green-500 transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 {siteConfig.shortName}. All rights reserved. Revolutionizing restaurant revenue.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-green-500 text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-500 text-sm transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-green-500 text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}