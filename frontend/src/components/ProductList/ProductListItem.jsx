import { Link } from 'react-router-dom'

const ProductListItem = ({ product }) => {
  const productId = product._id || product.id

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link 
        to={`/product/${productId}`} 
        className="w-full md:w-48 h-48 flex-shrink-0 flex items-center justify-center bg-white rounded-md overflow-hidden"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain" 
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/product/${productId}`}>
              <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
              )}
            </div>
            {/* Ratings & Orders */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-orange-500 text-sm font-medium ml-1">{product.rating || '4.5'}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 text-sm">154 orders</span>
              <span className="text-gray-300">•</span>
              <span className="text-teal-500 text-sm font-medium">Free Shipping</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors p-2 border border-gray-200 rounded-md bg-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </p>
        <Link to={`/product/${productId}`} className="text-primary font-medium text-sm hover:underline">
          View details
        </Link>
      </div>
    </div>
  )
}

export default ProductListItem
