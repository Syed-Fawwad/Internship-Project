import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-2"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="space-y-2 mt-4">{children}</div>}
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
              className={`hover:text-primary cursor-pointer transition-colors ${currentCategory === cat ? 'text-primary font-medium' : ''}`}
            >
              {cat}
            </li>
          ))}
          <li className="text-primary font-medium cursor-pointer">See all</li>
        </ul>
      </FilterSection>

      <FilterSection title="Brands">
        <div className="space-y-2">
          {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
              <span className="text-gray-600 group-hover:text-gray-900">{brand}</span>
            </label>
          ))}
          <p className="text-primary font-medium cursor-pointer pt-2">See all</p>
        </div>
      </FilterSection>

      <FilterSection title="Features">
        <div className="space-y-2">
          {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'].map((feature) => (
            <label key={feature} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
              <span className="text-gray-600 group-hover:text-gray-900">{feature}</span>
            </label>
          ))}
          <p className="text-primary font-medium cursor-pointer pt-2">See all</p>
        </div>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="space-y-4">
          <div className="px-2">
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          </div>
          <div className="flex gap-2">
            <div className="flex-grow">
              <label className="text-xs text-gray-500 mb-1 block">Min</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="flex-grow">
              <label className="text-xs text-gray-500 mb-1 block">Max</label>
              <input type="number" placeholder="999999" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <button className="w-full py-2 border border-gray-200 rounded-md text-primary font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Apply
          </button>
        </div>
      </FilterSection>

      <FilterSection title="Ratings">
        <div className="space-y-2">
          {[5, 4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
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
      <div className="md:hidden mb-4">
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors w-full justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
          Filters
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full lg:w-64 flex-shrink-0">
        <FilterContent />
      </aside>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-[100] transition-opacity duration-300 md:hidden ${isMobileDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileDrawerOpen(false)}
      ></div>
      <div 
        className={`fixed inset-y-0 left-0 w-80 bg-white z-[110] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <FilterContent />
        </div>
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar
