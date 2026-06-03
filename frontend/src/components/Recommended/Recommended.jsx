import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../utils/api'
import { products as mockProducts } from '../../utils/dummyData'

const Recommended = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.getProducts()
        // API returns array directly
        if (res && Array.isArray(res) && res.length > 0) {
          setItems(res.slice(0, 10))
        } else {
          setItems(mockProducts.slice(0, 10))
        }
      } catch (error) {
        console.error('Error fetching recommended items:', error)
        setItems(mockProducts.slice(0, 10))
      } finally {
        setLoading(false)
      }
    }
    fetchRecommended()
  }, [])

  if (loading && items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-40 bg-gray-200 rounded"></div>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended items</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <Link 
              key={item._id || item.id} 
              to={`/product/${item._id || item.id}`} 
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
            >
              <div className="aspect-square flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src={api.getImageUrl(item.image)} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="mt-auto">
                <p className="text-gray-900 font-bold text-lg">${item.price}</p>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recommended
