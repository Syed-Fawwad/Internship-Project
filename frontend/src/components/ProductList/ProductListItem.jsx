import { Link } from 'react-router-dom'

const ProductListItem = ({ product }) => {
  const productId = product._id || product.id

  return (
    <div className="bg-white border border-gray-200 rounded-2xl md:rounded-lg p-5 md:p-4 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-500 group relative">
      {/* Product Image */}
      <Link 
        to={`/product/${productId}`} 
        className="w-full md:w-48 h-56 md:h-48 flex-shrink-0 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-gray-50 md:border-transparent group-hover:scale-105 transition-transform duration-700"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain p-2" 
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <Link to={`/product/${productId}`}>
              <h3 className="text-lg md:text-base font-black text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer leading-tight line-clamp-2">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center gap-4 mb-3 md:mb-2">
              <span className="text-2xl md:text-xl font-black text-gray-900 tracking-tighter">${parseFloat(product.price).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-300 line-through text-xs font-bold tracking-tight">${parseFloat(product.originalPrice).toFixed(2)}</span>
              )}
            </div>

            {/* Ratings & Status - Mobile optimized grid */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                <svg className="w-3 h-3 text-orange-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-orange-600 text-[10px] font-black">{product.rating || '4.5'}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                 <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                 154 orders
              </span>
              <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">Free Shipping</span>
            </div>
          </div>
          
          <button className="hidden md:block text-gray-300 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6 md:mb-4 line-clamp-2 leading-relaxed font-medium md:max-w-xl">
          {product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <Link to={`/product/${productId}`} className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-sm">
            View details
          </Link>
          <button className="md:hidden p-2.5 text-gray-400 hover:text-red-500 transition-all bg-gray-50 rounded-xl">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
