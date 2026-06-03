import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-black text-[10px] uppercase tracking-widest text-gray-900 mb-2 group"
      >
        <span className="group-hover:text-primary transition-colors">{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-gray-400 group-hover:text-primary`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-1 duration-300">{children}</div>}
    </div>
  )
}

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const currentCategory = searchParams.get('category') || 'Tech'

  const categories = ['Tech', 'Clothing', 'Interior']

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileDrawerOpen])

  const handleCategoryChange = (cat) => {
    searchParams.set('category', cat)
    setSearchParams(searchParams)
    setIsMobileDrawerOpen(false)
  }

  const FilterContent = () => (
    <>
      <FilterSection title="Category">
        <ul className="space-y-2 text-gray-600">
          {categories.map(cat => (
            <li 
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-sm font-bold hover:text-primary cursor-pointer transition-colors flex items-center gap-2 ${currentCategory === cat ? 'text-primary' : 'text-gray-500'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${currentCategory === cat ? 'bg-primary' : 'bg-transparent border border-gray-200'}`}></div>
              {cat}
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Brands">
        <div className="space-y-2">
          {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                <svg className="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="space-y-4">
          <div className="px-2">
            <input type="range" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Min Price</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary" />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Max Price</label>
              <input type="number" placeholder="9999" className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary" />
            </div>
          </div>
          <button className="w-full py-3 bg-white border-2 border-primary/10 rounded-xl text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95">
            Apply Filter
          </button>
        </div>
      </FilterSection>

      <FilterSection title="Ratings">
        <div className="space-y-3">
          {[5, 4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < stars ? 'text-orange-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current:</span>
          <span className="text-xs font-black text-primary uppercase">{currentCategory}</span>
        </div>
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
          Filters
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm sticky top-28 h-fit">
        <FilterContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] transition-opacity duration-300 lg:hidden ${isMobileDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileDrawerOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-x-0 bottom-0 max-h-[85vh] bg-white z-[90] rounded-t-[2.5rem] shadow-2xl transform transition-transform duration-500 ease-out lg:hidden overflow-hidden flex flex-col ${isMobileDrawerOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drawer Handle */}
        <div className="flex justify-center p-4" onClick={() => setIsMobileDrawerOpen(false)}>
          <div className="w-12 h-1.5 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"></div>
        </div>
        
        <div className="px-8 pb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Filters</h2>
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-8 pb-10 custom-scrollbar">
          <FilterContent />
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-4">
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="py-4 rounded-2xl bg-white border border-gray-200 text-gray-500 font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95"
          >
            Reset All
          </button>
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="py-4 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar
