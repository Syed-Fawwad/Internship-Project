import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Logo and Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/assets/Layout/Brand/logo-colored.png" alt="Brand" className="h-9 md:h-10" />
            </Link>
            <p className="text-gray-500 mb-8 max-w-xs leading-relaxed font-medium">
              Your premium destination for global trade, high-quality electronics, and sustainable style.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social}`} 
                  className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-90"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-4 gap-8">
            <div>
              <h4 className="font-black text-gray-900 mb-6 text-xs uppercase tracking-[0.2em]">About</h4>
              <ul className="space-y-3">
                {['Our Story', 'Store Finder', 'Collections', 'Editorial'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 mb-6 text-xs uppercase tracking-[0.2em]">Partnership</h4>
              <ul className="space-y-3">
                {['Affiliates', 'Suppliers', 'Logistics', 'Wholesale'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 mb-6 text-xs uppercase tracking-[0.2em]">Information</h4>
              <ul className="space-y-3">
                {['Help Center', 'Returns', 'Shipping', 'Contact Us'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 mb-6 text-xs uppercase tracking-[0.2em]">For Users</h4>
              <ul className="space-y-3">
                {['Login', 'Register', 'Settings', 'My Orders'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 ECOMMERCE PREMIUM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img src="/assets/Layout1/Image/flags/US@2x.png" alt="English" className="h-3 w-5 object-cover rounded-sm shadow-sm" />
              <span className="text-gray-600 text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors">English</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            {/* Mock payment methods bottom bar */}
            <div className="flex gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-5 bg-gray-200 rounded-sm"></div>)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
