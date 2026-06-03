import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../utils/api'

// Fallback deals for UI stability
const MOCK_DEALS = [
  { id: 8, name: 'Smart watches', discount: '-25%', image: '/assets/Image/tech/image 23.png' },
  { id: 5, name: 'Laptops', discount: '-15%', image: '/assets/Image/tech/image 29.png' },
  { id: 2, name: 'GoPro cameras', discount: '-40%', image: '/assets/Image/tech/6.png' },
  { id: 4, name: 'Headphones', discount: '-25%', image: '/assets/Image/tech/8.png' },
  { id: 1, name: 'Canon cameras', discount: '-25%', image: '/assets/Image/tech/image 32.png' },
]

const Deals = () => {
  const [deals, setDeals] = useState(MOCK_DEALS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await api.getProducts()
        // API returns array directly
        const discountedProducts = (res || [])
          .filter(p => p.originalPrice)
          .map(p => ({
            ...p,
            id: p._id,
            discount: `-${Math.round((1 - p.price / p.originalPrice) * 100)}%`
          }))
          .slice(0, 5)
        
        if (discountedProducts.length > 0) {
          setDeals(discountedProducts)
        }
      } catch (error) {
        console.warn('Using mock deals for UI consistency')
      }
    }
    fetchDeals()
  }, [])

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row overflow-hidden">
          {/* Countdown Side */}
          <div className="p-6 md:w-72 border-b md:border-b-0 md:border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Deals and offers</h2>
            <p className="text-gray-500 mb-6 text-sm">Hygiene equipments</p>
            <div className="flex gap-2">
              {[
                { label: 'Days', value: '04' },
                { label: 'Hour', value: '13' },
                { label: 'Min', value: '34' },
                { label: 'Sec', value: '56' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 text-white rounded-md flex flex-col items-center justify-center w-12 h-12">
                  <span className="text-sm font-bold leading-none">{item.value}</span>
                  <span className="text-[10px] uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {deals.map((deal) => (
              <Link 
                key={deal._id || deal.id} 
                to={`/product/${deal._id || deal.id}`} 
                className="p-4 border-r border-gray-100 last:border-r-0 flex flex-col items-center text-center hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="w-32 h-32 mb-4 flex items-center justify-center overflow-hidden">
                  <img src={api.getImageUrl(deal.image)} alt={deal.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-sm text-gray-800 mb-2 line-clamp-1 group-hover:text-primary transition-colors">{deal.name}</h3>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                  {deal.discount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Deals

