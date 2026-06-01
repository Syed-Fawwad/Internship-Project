import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const productId = product._id || product.id

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/product/${productId}`} className="relative aspect-square bg-white p-4 flex items-center justify-center border-b border-gray-100 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-orange-400">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-3.5 h-3.5 ${
                    index < Math.floor(product.rating || 4)
                      ? 'fill-current'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-orange-500 text-xs font-medium">{product.rating || '4.5'}</span>
          </div>

          <Link to={`/product/${productId}`}>
            <h3 className="text-sm text-gray-600 hover:text-primary transition-colors line-clamp-2 leading-relaxed mb-3">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-50">
          <Link to={`/product/${productId}`} className="text-xs font-bold text-primary hover:underline">
            View Details
          </Link>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
