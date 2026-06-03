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
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-xl inline-block max-w-lg">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-gray-50/50">
              <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 118 0m-4 8v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h11.236a2 2 0 011.908 1.4L21 18.28" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Your cart is empty</h2>
            <p className="text-gray-400 font-bold mb-10 leading-relaxed uppercase text-xs tracking-widest px-6">Explore our global inventory and add items to your collection to proceed with checkout.</p>
            <Link to="/" className="bg-primary text-white px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-primary-700 transition-all shadow-2xl shadow-primary/30 active:scale-95 inline-block">
              Start Sourcing
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Shopping Cart</h1>
            <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mt-1">{cartItems.length} items verified for checkout</p>
          </div>
          <button 
            onClick={clearCart} 
            className="text-red-500 font-black uppercase tracking-widest text-[9px] border-2 border-red-100 bg-white px-6 py-2.5 rounded-xl hover:bg-red-50 transition-all active:scale-95 shadow-sm"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="flex-grow space-y-6">
            <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm ring-1 ring-black/[0.02]">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`p-8 flex flex-col sm:flex-row gap-8 ${index !== cartItems.length - 1 ? 'border-b border-gray-50' : ''} group hover:bg-gray-50/30 transition-colors`}>
                  <div className="w-32 h-32 border-2 border-gray-50 rounded-2xl p-4 flex-shrink-0 bg-white flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-500 ring-4 ring-gray-50/50">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Link to={`/product/${item.id}`} className="text-gray-900 font-black hover:text-primary transition-colors line-clamp-2 pr-10 leading-tight text-xl tracking-tight">
                        {item.name}
                      </Link>
                      <span className="text-2xl font-black text-gray-900 whitespace-nowrap tracking-tighter">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                       <span className="px-3 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{item.category || 'Tech'}</span>
                       <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                       <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Verified Supplier</span>
                    </div>
                    
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm ring-4 ring-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2.5 px-4 hover:bg-gray-50 transition-colors border-r border-gray-100 text-gray-400 font-black text-lg"
                          >
                            -
                          </button>
                          <span className="px-6 text-sm font-black text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2.5 px-4 hover:bg-gray-50 transition-colors border-l border-gray-100 text-gray-400 font-black text-lg"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-3 text-red-400 hover:text-red-600 hover:bg-white hover:shadow-lg rounded-xl transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                      
                      <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:text-white hover:bg-primary border-2 border-primary/10 px-8 py-3 rounded-2xl bg-white transition-all shadow-sm active:scale-95">
                        Save For Later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 px-4">
              <Link to="/" className="flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-2xl shadow-black/10 active:scale-95 w-full sm:w-auto justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Inventory
              </Link>
            </div>
          </div>

          {/* Checkout Summary */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 shadow-sm sticky top-28 overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="mb-10 relative z-10">
                <p className="text-gray-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em]">Redeem Vouchers</p>
                <div className="flex border-2 border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50 shadow-inner group-focus-within:border-primary transition-all ring-4 ring-gray-50">
                  <input type="text" placeholder="Coupon Code" className="flex-grow px-5 py-4 outline-none text-sm bg-transparent font-black tracking-tight" />
                  <button className="bg-white border-l-2 border-gray-100 px-6 py-4 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Apply</button>
                </div>
              </div>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between text-gray-400 text-xs font-black uppercase tracking-widest">
                  <span>Subtotal:</span>
                  <span className="text-gray-900 tracking-tighter text-base">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500 text-xs font-black uppercase tracking-widest">
                  <span>Discount:</span>
                  <span className="tracking-tighter text-base">-$0.00</span>
                </div>
                <div className="flex justify-between text-teal-600 text-xs font-black uppercase tracking-widest border-b border-gray-50 pb-6">
                  <span>Tax & Fees:</span>
                  <span className="tracking-tighter text-base">+${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-black text-sm uppercase tracking-[0.2em]">Net Total</span>
                    <span className="text-gray-900 font-black text-4xl tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-teal-500 text-white py-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl shadow-teal-500/40 active:scale-[0.97] mb-10 relative z-10">
                Proceed to Pay
              </button>
              
              <div className="flex flex-wrap justify-center gap-5 opacity-20 grayscale pointer-events-none mb-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-9 bg-gray-200 rounded-xl border border-gray-300"></div>
                ))}
              </div>
              <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-widest">SECURE SSL ENCRYPTED CHECKOUT</p>
            </div>
          </aside>
        </div>
        
        {/* Saved for later section */}
        <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 mt-16 shadow-sm overflow-hidden group">
          <h2 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-tighter">Your Collection</h2>
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-8 pb-4">
            {[
              { id: 1, name: 'Canon Camera EOS 2000', price: '998.00', image: '/assets/Image/tech/image 33.png', category: 'Tech' },
              { id: 4, name: 'Smart Watch Pro Series', price: '199.00', image: '/assets/Image/tech/8.png', category: 'Tech' },
              { id: 5, name: 'Modern Laptop Stand', price: '45.00', image: '/assets/Image/tech/image 34.png', category: 'Tech' },
              { id: 2, name: 'GoPro HERO6 4K Action', price: '799.00', image: '/assets/Image/tech/6.png', category: 'Tech' },
            ].map(item => (
              <div key={item.id} className="min-w-[240px] group/item cursor-pointer flex flex-col snap-start">
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-square border-2 border-gray-50 rounded-[2rem] p-8 bg-white flex items-center justify-center mb-6 group-hover/item:border-primary/20 group-hover/item:shadow-2xl transition-all duration-700 relative overflow-hidden ring-1 ring-black/[0.01]">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover/item:scale-115 transition-transform duration-1000" />
                  </div>
                </Link>
                <div className="mt-auto">
                  <h4 className="text-gray-900 font-black text-2xl mb-2 tracking-tighter">${item.price}</h4>
                  <Link to={`/product/${item.id}`}>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest line-clamp-1 mb-6 hover:text-primary transition-colors">{item.name}</p>
                  </Link>
                  <button 
                    onClick={() => addToCart(item, 1)}
                    className="flex items-center justify-center gap-3 border-2 border-primary/10 rounded-2xl px-6 py-4 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all w-full active:scale-95 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Import to Cart
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
