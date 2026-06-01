import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../utils/api'

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      if (!currentProduct) return
      try {
        const res = await api.getProducts(`category=${currentProduct.category}`)
        // API returns array directly
        if (res && Array.isArray(res)) {
          const filtered = res
            .filter(p => p._id !== currentProduct._id)
            .slice(0, 6)
          setRelatedProducts(filtered)
        }
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRelated()
  }, [currentProduct])

  if (loading || relatedProducts.length === 0) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight uppercase text-sm">Related products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {relatedProducts.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} className="group block">
            <div className="bg-gray-100 rounded-lg p-3 aspect-square flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-xs text-gray-700 line-clamp-2 hover:text-primary transition-colors leading-relaxed mb-1">{product.name}</h3>
            <p className="text-gray-400 text-xs font-bold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
