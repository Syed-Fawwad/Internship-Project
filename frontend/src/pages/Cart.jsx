import { Link } from 'react-router-dom'
import { useCart } from '../utils/CartContext'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, addToCart, clearCart } = useCart()

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Shopping Cart', link: '/cart', active: true },
  ]

  const shipping = cartItems.length > 0 ? 10.00 : 0
  const tax = cartItems.length > 0 ? cartTotal * 0.05 : 0
  const total = cartTotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-white p-10 rounded-lg border border-gray-200 shadow-sm inline-block">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet. Browse our categories and find something you love!</p>
            <Link to="/" className="bg-primary text-white px-10 py-3 rounded-lg font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary/20 active:scale-95 inline-block">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 font-black tracking-tight">My cart ({cartItems.length})</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items List */}
          <div className="flex-grow space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`p-6 flex flex-col sm:flex-row gap-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-28 h-28 border border-gray-200 rounded-lg p-2 flex-shrink-0 bg-white flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${item.id}`} className="text-gray-900 font-bold hover:text-primary transition-colors line-clamp-2 pr-6 leading-tight text-lg">
                        {item.name}
                      </Link>
                      <span className="text-xl font-black text-gray-900 whitespace-nowrap tracking-tighter">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    <p className="text-gray-400 text-[10px] mb-4 uppercase tracking-widest font-black">Category: {item.category || 'General'}</p>
                    
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-black/[0.02]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 px-3 hover:bg-gray-50 transition-colors border-r border-gray-200 text-gray-500 font-bold"
                          >
                            -
                          </button>
                          <span className="px-5 py-1 text-sm font-black text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 px-3 hover:bg-gray-50 transition-colors border-l border-gray-200 text-gray-500 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-xs font-black hover:underline bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <button className="text-primary text-xs font-black hover:underline border-2 border-primary/10 px-5 py-2 rounded-lg bg-white hover:bg-primary hover:text-white hover:border-primary transition-all uppercase tracking-widest">
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center py-4 px-2">
              <Link to="/" className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary/20 active:scale-95">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to shop
              </Link>
              <button 
                onClick={clearCart} 
                className="text-primary font-black uppercase tracking-widest hover:underline border-2 border-primary/10 px-8 py-3 rounded-lg bg-white hover:bg-primary/5 transition-all active:scale-95 shadow-sm"
              >
                Remove all
              </button>
            </div>
            
            {/* Features section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-gray-200 mt-10">
              {[
                { title: 'Secure payment', desc: 'Have you ever finally just', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { title: 'Customer support', desc: 'Have you ever finally just', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
                { title: 'Free delivery', desc: 'Have you ever finally just', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight">{feature.title}</h4>
                    <p className="text-gray-400 text-[11px] mt-0.5 leading-tight">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="mb-8">
                <p className="text-gray-500 text-[10px] font-black uppercase mb-3 tracking-widest">Have a coupon?</p>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-inner group focus-within:border-primary transition-all ring-1 ring-black/[0.02]">
                  <input type="text" placeholder="Add coupon" className="flex-grow px-4 py-3 outline-none text-sm bg-transparent font-bold tracking-tight" />
                  <button className="bg-white border-l border-gray-200 px-5 py-3 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Apply</button>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 text-sm font-bold">
                  <span>Subtotal:</span>
                  <span className="text-gray-900 font-black tracking-tight">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500 text-sm font-bold">
                  <span>Discount:</span>
                  <span className="font-black tracking-tight">-$0.00</span>
                </div>
                <div className="flex justify-between text-teal-500 text-sm font-bold">
                  <span>Tax (5%):</span>
                  <span className="font-black tracking-tight">+${tax.toFixed(2)}</span>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-black text-lg uppercase tracking-tighter">Total</span>
                    <span className="text-gray-900 font-black text-3xl tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-teal-500 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/30 active:scale-95 mb-8">
                Checkout
              </button>
              
              <div className="flex flex-wrap justify-center gap-4 opacity-40 grayscale pointer-events-none">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-12 h-7 bg-gray-100 rounded-md border border-gray-200"></div>
                ))}
              </div>
            </div>
          </aside>
        </div>
        
        {/* Saved for later section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mt-12 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Saved for later</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[
              { id: 1, name: 'Canon Camera EOS 2000', price: '998.00', image: '/assets/Image/tech/image 33.png', category: 'Tech' },
              { id: 4, name: 'Smart Watch Pro Series', price: '199.00', image: '/assets/Image/tech/8.png', category: 'Tech' },
              { id: 5, name: 'Modern Laptop Stand', price: '45.00', image: '/assets/Image/tech/image 34.png', category: 'Tech' },
              { id: 2, name: 'GoPro HERO6 4K Action', price: '799.00', image: '/assets/Image/tech/6.png', category: 'Tech' },
            ].map(item => (
              <div key={item.id} className="group cursor-pointer flex flex-col h-full">
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-square border-2 border-gray-50 rounded-2xl p-6 bg-white flex items-center justify-center mb-6 group-hover:border-primary/20 group-hover:shadow-xl transition-all duration-500 relative overflow-hidden ring-1 ring-black/[0.02]">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </Link>
                <div className="mt-auto px-1">
                  <h4 className="text-gray-900 font-black text-xl mb-1 leading-none tracking-tighter">${item.price}</h4>
                  <Link to={`/product/${item.id}`}>
                    <p className="text-gray-400 text-xs font-bold line-clamp-2 mb-6 hover:text-primary transition-colors leading-relaxed">{item.name}</p>
                  </Link>
                  <button 
                    onClick={() => addToCart(item, 1)}
                    className="flex items-center justify-center gap-2 border-2 border-primary/10 rounded-xl px-4 py-3 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all w-full active:scale-95 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
