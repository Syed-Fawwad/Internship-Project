import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Newsletter from '../components/Newsletter/Newsletter'
import RelatedProducts from '../components/ProductDetail/RelatedProducts'
import ProductTabs from '../components/ProductDetail/ProductTabs'
import { useCart } from '../utils/CartContext'
import { api } from '../utils/api'
import { products as mockProducts } from '../utils/dummyData'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // 1. Try fetching from API first
        const res = await api.getProduct(id)
        if (res) {
          const apiProduct = { ...res, id: res._id }
          setProduct(apiProduct)
          
          // Fetch recommendations for sidebar
          const recRes = await api.getProducts(`category=${res.category}`)
          if (recRes && Array.isArray(recRes)) {
            setRecommended(recRes.filter(p => p._id !== id).slice(0, 4))
          }
          setLoading(false)
          return
        }
      } catch (error) {
        console.warn('API fetch failed, falling back to mock data')
      }

      // 2. Fallback to mock data if API fails or returns nothing
      const fallback = mockProducts.find(p => p.id.toString() === id.toString())
      if (fallback) {
        setProduct(fallback)
        const recs = mockProducts.filter(p => p.category === fallback.category && p.id.toString() !== id.toString()).slice(0, 4)
        setRecommended(recs)
      }
      setLoading(false)
    }

    window.scrollTo(0, 0)
    setQuantity(1)
    setActiveImage(0)
    setIsAdded(false)
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/" className="text-primary hover:underline font-medium">Back to shopping</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: product.category, link: `/list?category=${product.category}` },
    { label: product.name, link: '#', active: true },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Product Main Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
              <div className="border border-gray-100 rounded-3xl p-6 mb-6 flex items-center justify-center bg-white aspect-square overflow-hidden max-w-[440px] mx-auto shadow-inner relative group">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[activeImage] : product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-scale-down transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="grid grid-cols-5 gap-3 max-w-[440px] mx-auto overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`border-2 rounded-2xl p-2 flex items-center justify-center bg-white aspect-square cursor-pointer transition-all snap-start ${
                      activeImage === idx ? 'border-primary ring-2 ring-primary/10 shadow-lg' : 'hover:border-primary/40 border-gray-50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx}`} className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-teal-600 bg-teal-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100/50 flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                  {product.stock || 'In stock'}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-5 leading-tight tracking-tight">{product.name}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                <div className="flex items-center text-orange-400 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shadow-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-orange-600 ml-1.5 font-black text-xs">{product.rating || '4.5'}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest">
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {product.reviews || 32} reviews
                  </span>
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                  <span className="text-gray-400 flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest">
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 8v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h11.236a2 2 0 011.908 1.4L21 18.28" />
                    </svg>
                    154 sold
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-orange-50/50 p-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 border-2 border-orange-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                   <svg className="w-32 h-32 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                </div>
                <div className="flex flex-col relative z-10">
                  <span className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-2 bg-white px-3 py-1 rounded-full border border-red-50 w-fit shadow-sm">Limited Offer!</span>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">${parseFloat(product.price).toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-300 line-through font-bold tracking-tight">${parseFloat(product.originalPrice).toFixed(2)}</span>
                    )}
                  </div>
                  {quantity > 1 && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg">Subtotal</span>
                      <span className="text-gray-900 font-black text-xl tracking-tight">${(parseFloat(product.price) * quantity).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 sm:mt-0 text-left sm:text-right relative z-10">
                  <span className="block text-[10px] text-gray-400 font-black uppercase mb-3 tracking-[0.2em]">Flash Sale Ends</span>
                  <div className="flex gap-2">
                    {['02', '13', '44'].map((time, i) => (
                      <span key={i} className="bg-white border-2 border-orange-100 px-3 py-2 rounded-2xl text-xs font-black text-orange-600 shadow-md ring-4 ring-orange-50/50">{time}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-4 mb-10 bg-gray-50/30 p-6 md:p-8 rounded-[2rem] border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Technical Specifications</p>
                {(product.specs || [
                  { label: 'Type', value: 'Classic shoes' },
                  { label: 'Material', value: 'Plastic material' },
                  { label: 'Design', value: 'Modern design' },
                  { label: 'Customization', value: 'Customized logo and design' },
                ]).slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex items-center border-b border-white last:border-0 pb-3 last:pb-0">
                    <span className="w-1/3 text-gray-400 text-[10px] font-black uppercase tracking-widest">{spec.label}</span>
                    <span className="w-2/3 text-gray-800 text-sm font-bold tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Interaction Row */}
              <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-8 border-t border-gray-50">
                {/* Quantity */}
                <div className="flex items-center justify-between border-2 border-gray-100 rounded-2xl overflow-hidden bg-white shadow-md ring-4 ring-gray-50 h-16 sm:w-44">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-gray-200 text-gray-400 font-black text-xl active:bg-gray-100"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center text-gray-900 font-black outline-none bg-transparent text-xl tracking-tighter"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-gray-200 text-gray-500 font-black text-xl active:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-4 flex-grow">
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-grow py-5 px-8 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-[0.97] text-white text-xs md:text-sm ${
                      isAdded ? 'bg-teal-500 shadow-teal-500/30' : 'bg-primary hover:bg-primary-700 shadow-primary/40'
                    }`}
                  >
                    {isAdded ? 'Item Added!' : 'Add to shopping cart'}
                  </button>
                  <button className="flex items-center justify-center p-5 rounded-2xl border-2 border-gray-100 bg-white text-gray-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-md active:scale-95">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Tabs */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-grow">
            <ProductTabs description={product.description} specs={product.specs} />
          </div>
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm sticky top-28 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="font-black text-gray-900 mb-8 text-[10px] uppercase tracking-[0.3em] text-center border-b border-gray-50 pb-6 relative z-10">You may like</h3>
              <div className="space-y-8 relative z-10">
                {recommended.map((item) => (
                  <Link key={item._id || item.id} to={`/product/${item._id || item.id}`} className="flex gap-5 group/item cursor-pointer items-center">
                    <div className="w-20 h-20 border-2 border-gray-50 rounded-2xl p-3 flex-shrink-0 bg-white group-hover/item:border-primary/20 transition-all overflow-hidden ring-4 ring-gray-50/50 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover/item:scale-115 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[10px] text-gray-400 font-black uppercase tracking-wider line-clamp-2 group-hover/item:text-primary transition-colors leading-tight mb-2">{item.name}</h4>
                      <p className="text-gray-900 font-black text-base tracking-tighter">${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
                {recommended.length === 0 && <p className="text-gray-300 text-[9px] font-black uppercase tracking-widest text-center py-10 italic">Curating suggestions...</p>}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>

      <Newsletter />
    </div>
  )
}

export default ProductDetail
