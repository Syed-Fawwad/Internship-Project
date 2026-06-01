import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../utils/CartContext'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const { cartCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/src/assets/Layout/Brand/logo-colored.png"
            alt="Brand Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-2xl hidden md:flex">
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              navigate(`/list?search=${searchQuery}`)
            }}
            className="flex w-full border-2 border-primary rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="border-l border-gray-300 px-4 py-2 hidden lg:flex items-center bg-white cursor-pointer hover:bg-gray-50">
              <span className="text-gray-700 mr-2">All category</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button type="submit" className="bg-primary text-white px-8 py-2 font-medium hover:bg-primary-700 transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs mt-1 hidden sm:block">Profile</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex flex-col items-center text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-xs mt-1 hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1 hidden sm:block">Sign In</span>
            </Link>
          )}
          
          <Link to="/orders" className="hidden md:flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs mt-1 hidden sm:block">My cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom Navbar / Mobile Menu */}
      <div className={`border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block bg-white`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
            <Link 
              to="/list" 
              className={`flex items-center font-medium transition-colors hover:text-primary ${isActive('/list') ? 'text-primary' : 'text-gray-900'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              All category
            </Link>
            <nav className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <Link to="/list" className="font-medium text-gray-900 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Hot offers</Link>
              <Link to="/list" className="font-medium text-gray-900 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Gift boxes</Link>
              <Link to="/list" className="font-medium text-gray-900 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link to="/list" className="font-medium text-gray-900 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Menu item</Link>
              <div className="relative group cursor-pointer hidden md:block">
                <div className="flex items-center font-medium text-gray-900 hover:text-primary transition-colors">
                  Help
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="font-medium text-primary hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center cursor-pointer hover:text-primary transition-colors">
              <span className="font-medium text-gray-900 mr-1">English, USD</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center cursor-pointer hover:text-primary transition-colors">
              <span className="font-medium text-gray-900 mr-2">Ship to</span>
              <img src="/src/assets/Layout1/Image/flags/DE@2x.png" alt="Germany" className="h-4 w-6 object-cover" />
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
