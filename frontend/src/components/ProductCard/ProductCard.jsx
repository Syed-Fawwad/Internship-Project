import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const productId = product._id || product.id

  return (
    <div className="bg-white border border-gray-200 rounded-2xl md:rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full group ring-1 ring-black/[0.02]">
      {/* Image Container */}
      <Link to={`/product/${productId}`} className="relative aspect-square bg-white p-6 md:p-4 flex items-center justify-center border-b border-gray-50 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Mobile quick add button - optional visual flavor */}
        <div className="absolute top-3 right-3 md:hidden">
          <div className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white/50">
             <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 md:p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2 md:mb-1">
            <span className="text-xl md:text-lg font-black text-gray-900 tracking-tighter">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs font-bold text-gray-300 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3 md:mb-2 bg-orange-50 w-fit px-2 py-0.5 rounded-full border border-orange-100/50">
            <div className="flex items-center text-orange-400">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-orange-600 text-[10px] font-black uppercase">{product.rating || '4.5'}</span>
          </div>

          <Link to={`/product/${productId}`}>
            <h3 className="text-sm font-bold text-gray-600 group-hover:text-primary transition-colors line-clamp-2 leading-relaxed mb-4 md:mb-3">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
          <Link to={`/product/${productId}`} className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-700 transition-colors">
            Source Now
          </Link>
          <button className="p-2 text-gray-300 hover:text-red-500 transition-all active:scale-90 bg-gray-50 md:bg-transparent rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
