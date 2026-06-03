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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-all active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 transition-transform active:scale-95">
          <img
            src="/assets/Layout/Brand/logo-colored.png"
            alt="Brand Logo"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-grow max-w-2xl hidden md:flex">
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              navigate(`/list?search=${searchQuery}`)
            }}
            className="flex w-full border-2 border-primary rounded-lg overflow-hidden focus-within:shadow-lg transition-shadow"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow px-4 py-2 outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white px-8 py-2 font-black uppercase tracking-widest text-xs hover:bg-primary-700 transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Mobile Search Trigger */}
          <button 
            onClick={() => navigate('/list')}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {user ? (
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-tighter mt-1">Profile</span>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-tighter mt-1">Sign In</span>
            </Link>
          )}
          
          <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors relative p-2 md:p-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-tighter mt-1 hidden md:block">My cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 md:-top-1 md:-right-1 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-lg ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop Bottom Navbar */}
      <div className="border-t border-gray-100 hidden md:block bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link 
              to="/list" 
              className={`flex items-center font-black text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-primary ${isActive('/list') ? 'text-primary' : 'text-gray-900'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              All category
            </Link>
            <nav className="flex items-center space-x-6">
              {['Hot offers', 'Gift boxes', 'Projects', 'Menu item'].map((item) => (
                <Link key={item} to="/list" className="font-bold text-xs text-gray-600 hover:text-primary transition-colors uppercase tracking-wider">{item}</Link>
              ))}
              {user?.role === 'admin' && (
                <Link to="/admin" className="font-black text-[10px] text-primary hover:underline uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">Admin Hub</Link>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center cursor-pointer hover:text-primary transition-colors group">
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-widest mr-1 group-hover:text-primary transition-colors">Ship to</span>
              <img src="/assets/Layout1/Image/flags/DE@2x.png" alt="Germany" className="h-3 w-5 object-cover rounded-sm shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <img src="/assets/Layout/Brand/logo-colored.png" alt="Logo" className="h-8 w-auto" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Section in Drawer */}
          <div className="p-6 border-b border-gray-100">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg tracking-tight">{user.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Member</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 font-bold text-sm">Welcome to our store!</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-white text-center py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">Sign In</Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-gray-100 text-gray-900 text-center py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest">Join</Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav Links in Drawer */}
          <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-1">
              <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 mt-2">Main Navigation</p>
              <MobileNavLink to="/" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Home" active={isActive('/')} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/list" icon="M4 6h16M4 12h16M4 18h16" label="All Categories" active={isActive('/list')} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/cart" icon="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" label="My Cart" active={isActive('/cart')} badge={cartCount} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/orders" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" label="My Orders" active={isActive('/orders')} onClick={() => setIsMobileMenuOpen(false)} />
            </div>

            {user?.role === 'admin' && (
              <div className="mt-8 pt-8 border-t border-gray-50 space-y-1">
                <p className="px-4 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Administration</p>
                <MobileNavLink to="/admin" icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" label="Control Hub" active={isActive('/admin')} onClick={() => setIsMobileMenuOpen(false)} />
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white border border-red-100 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] shadow-sm active:scale-95 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout Account
              </button>
            ) : (
              <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">E-Commerce Premium v2.0</p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const MobileNavLink = ({ to, icon, label, active, onClick, badge }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400 group-hover:text-gray-900'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
        </svg>
      </div>
      <span className={`font-black text-xs uppercase tracking-widest ${active ? 'text-primary' : ''}`}>{label}</span>
    </div>
    {badge > 0 && (
      <span className="bg-primary text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-primary/10">
        {badge}
      </span>
    )}
  </Link>
)

export default Navbar
