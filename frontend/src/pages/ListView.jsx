import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import FilterSidebar from '../components/Sidebar/FilterSidebar'
import ProductListItem from '../components/ProductList/ProductListItem'
import Pagination from '../components/Pagination/Pagination'
import Newsletter from '../components/Newsletter/Newsletter'
import { api } from '../utils/api'

// Stable mock data for List View restoration
const MOCK_LIST_PRODUCTS = [
  {
    id: 1,
    name: 'Canon Cmera EOS 2000, Black 10x zoom',
    price: '998.00',
    originalPrice: '1128.00',
    rating: 4.5,
    image: '/assets/Image/tech/image 33.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: '998.00',
    rating: 4.8,
    image: '/assets/Image/tech/6.png',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  },
  {
    id: 3,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: '998.00',
    rating: 4.8,
    image: '/assets/Image/tech/8.png',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  },
  {
    id: 4,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: '998.00',
    rating: 4.8,
    image: '/assets/Image/tech/image 34.png',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  },
  {
    id: 5,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: '998.00',
    originalPrice: '1128.00',
    rating: 4.8,
    image: '/assets/Image/tech/image 86.png',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  },
]

const ListView = () => {
  const [products, setProducts] = useState(MOCK_LIST_PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || 'Mobile accessory'
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `category=${category}${search ? `&search=${search}` : ''}`
        const res = await api.getProducts(query)
        // API returns array directly
        if (res && Array.isArray(res) && res.length > 0) {
          setProducts(res.map(p => ({ ...p, id: p._id, image: api.getImageUrl(p.image) })))
        }
      } catch (error) {
        console.warn('Backend API not available, using mock data for List View')
      }
    }
    fetchProducts()
  }, [category, search])

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Clothings', link: '#' },
    { label: "Men's wear", link: '#' },
    { label: 'Summer clothing', link: '#', active: true },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Main Content */}
          <main className="flex-grow">
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-2 text-gray-900">
                <span>{products.length} items in</span>
                <span className="font-bold">{category}</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" defaultChecked />
                  <span className="text-gray-900 text-sm">Verified only</span>
                </label>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center border border-gray-200 rounded-md bg-white overflow-hidden">
                  <Link to={`/grid?category=${category}`} className="p-2 hover:bg-gray-50 transition-colors border-r border-gray-200">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </Link>
                  <Link to={`/list?category=${category}`} className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center gap-2">
                Samsung
                <button className="text-gray-400 hover:text-gray-600 font-bold">×</button>
              </div>
              <div className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center gap-2">
                Apple
                <button className="text-gray-400 hover:text-gray-600 font-bold">×</button>
              </div>
              <button className="text-primary text-sm font-medium hover:underline ml-2">Clear all filters</button>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Pagination />
            </div>
          </main>
        </div>
      </div>

      <Newsletter />
    </div>
  )
}

export default ListView
