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
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
              <div className="border border-gray-100 rounded-2xl p-4 mb-4 flex items-center justify-center bg-white aspect-square overflow-hidden max-w-[440px] mx-auto shadow-inner">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[activeImage] : product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-scale-down transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="grid grid-cols-5 gap-3 max-w-[440px] mx-auto">
                {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`border-2 rounded-xl p-2 flex items-center justify-center bg-white aspect-square cursor-pointer transition-all ${
                      activeImage === idx ? 'border-primary ring-1 ring-primary' : 'hover:border-primary border-gray-50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx}`} className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-teal-500 flex items-center gap-1 text-sm font-black uppercase tracking-widest text-[10px]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {product.stock || 'In stock'}
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mb-4 leading-tight tracking-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center text-orange-400 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-orange-600 ml-1.5 font-black text-xs">{product.rating || '4.5'}</span>
                </div>
                <span className="text-gray-200">|</span>
                <span className="text-gray-400 flex items-center gap-1.5 font-bold text-xs">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {product.reviews || 32} reviews
                </span>
                <span className="text-gray-200">|</span>
                <span className="text-gray-400 flex items-center gap-1.5 font-bold text-xs">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 8v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h11.236a2 2 0 011.908 1.4L21 18.28" />
                  </svg>
                  154 sold
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-orange-50/50 p-4 rounded-3xl flex items-center justify-between mb-8 border-2 border-orange-100 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-1.5 bg-white px-2 py-0.5 rounded-full border border-red-50 w-fit">Flash Sale!</span>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-gray-900 tracking-tighter">${parseFloat(product.price).toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-300 line-through font-medium tracking-tight">${parseFloat(product.originalPrice).toFixed(2)}</span>
                    )}
                  </div>
                  {quantity > 1 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Subtotal</span>
                      <span className="text-gray-900 font-black text-lg tracking-tight">${(parseFloat(product.price) * quantity).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="text-right hidden sm:block">
                  <span className="block text-[10px] text-gray-400 font-black uppercase mb-2 tracking-widest">Offers End In</span>
                  <div className="flex gap-2">
                    {['02', '13', '44'].map((time, i) => (
                      <span key={i} className="bg-white border-2 border-orange-100 px-2.5 py-1.5 rounded-xl text-xs font-black text-orange-600 shadow-sm">{time}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-3 mb-8 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                {(product.specs || [
                  { label: 'Type', value: 'Classic shoes' },
                  { label: 'Material', value: 'Plastic material' },
                  { label: 'Design', value: 'Modern design' },
                  { label: 'Customization', value: 'Customized logo and design' },
                ]).slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex border-b border-white last:border-0 pb-2 last:pb-0 items-center">
                    <span className="w-1/3 text-gray-400 text-[9px] font-black uppercase tracking-widest">{spec.label}</span>
                    <span className="w-2/3 text-gray-900 text-sm font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Interaction Row */}
              <div className="mt-auto flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
                {/* Quantity */}
                <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 px-5 hover:bg-gray-50 transition-colors border-r border-gray-200 text-gray-500 font-black text-lg active:bg-gray-100"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center text-gray-900 font-black outline-none bg-transparent text-lg"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 px-5 hover:bg-gray-50 transition-colors border-l border-gray-200 text-gray-500 font-black"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-4 flex-grow sm:flex-grow-0">
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-grow sm:w-56 py-4 px-8 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 text-white ${
                      isAdded ? 'bg-teal-500 shadow-teal-500/20' : 'bg-primary hover:bg-primary-700 shadow-primary/20'
                    }`}
                  >
                    {isAdded ? 'Added to cart!' : 'Add to cart'}
                  </button>
                  <button className="flex items-center justify-center gap-2 border-2 border-gray-200 py-4 px-5 rounded-xl font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm bg-white active:scale-95">
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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <ProductTabs description={product.description} specs={product.specs} />
          </div>
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-6 text-xs uppercase tracking-widest border-b border-gray-50 pb-4">You may like</h3>
              <div className="space-y-6">
                {recommended.map((item) => (
                  <Link key={item._id || item.id} to={`/product/${item._id || item.id}`} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 border-2 border-gray-50 rounded-xl p-2 flex-shrink-0 bg-white group-hover:border-primary/20 transition-all overflow-hidden ring-1 ring-black/[0.01]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-xs text-gray-600 font-bold line-clamp-2 group-hover:text-primary transition-colors leading-relaxed mb-1">{item.name}</h4>
                      <p className="text-gray-900 font-black text-sm tracking-tight">${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
                {recommended.length === 0 && <p className="text-gray-400 text-[10px] italic font-medium uppercase tracking-widest text-center py-4">Finding suggestions...</p>}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>

      <Newsletter />
    </div>
  )
}

export default ProductDetail
