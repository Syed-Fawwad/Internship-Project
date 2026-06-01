import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory') // 'inventory' or 'users'
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [token] = useState(localStorage.getItem('token'))

  // Stats calculation
  const stats = {
    totalProducts: products.length,
    outOfStock: products.filter(p => p.stock === 'Out of stock' || p.stock === 0).length,
    totalUsers: users.length,
    adminCount: users.filter(u => u.role === 'admin').length
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, userRes] = await Promise.all([
          api.getProducts(),
          api.getUsers(token)
        ])
        setProducts(prodRes || [])
        setFilteredProducts(prodRes || [])
        setUsers(userRes || [])
        setFilteredUsers(userRes || [])
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  // Handle live filtering for Products
  useEffect(() => {
    if (activeTab === 'inventory') {
      let result = products
      if (searchTerm) {
        result = result.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      if (selectedCategory !== 'All') {
        result = result.filter(p => p.category === selectedCategory)
      }
      setFilteredProducts(result)
    } else {
      // Handle live filtering for Users
      let result = users
      if (searchTerm) {
        result = result.filter(u => 
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      setFilteredUsers(result)
    }
  }, [searchTerm, selectedCategory, products, users, activeTab])

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product? This action is permanent.')) {
      try {
        await api.deleteProduct(id, token)
        setProducts(products.filter(p => p._id !== id))
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      try {
        await api.deleteUser(id, token)
        setUsers(users.filter(u => u._id !== id))
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Navigation & Brand */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter shadow-sm">Enterprise</span>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Admin Hub</h1>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] ml-1">E-Commerce Management System v2.0</p>
          </div>
          
          <div className="flex bg-white p-1.5 border border-gray-200 rounded-2xl shadow-sm">
            <button 
              onClick={() => {setActiveTab('inventory'); setSearchTerm('')}}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === 'inventory' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Inventory
            </button>
            <button 
              onClick={() => {setActiveTab('users'); setSearchTerm('')}}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === 'users' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              User Registry
            </button>
          </div>
        </div>

        {/* Dynamic Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {activeTab === 'inventory' ? (
            <>
              <StatCard label="Total Inventory" value={stats.totalProducts} icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" color="blue" />
              <StatCard label="Product Categories" value={categories.length - 1} icon="M4 6h16M4 10h16M4 14h16M4 18h16" color="teal" />
              <StatCard label="Stock Alerts" value={stats.outOfStock} icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" color="red" />
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
                <Link to="/admin/add-product" className="flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
                  New Product
                </Link>
              </div>
            </>
          ) : (
            <>
              <StatCard label="Total Registered" value={stats.totalUsers} icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" color="indigo" />
              <StatCard label="Active Admins" value={stats.adminCount} icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" color="purple" />
              <StatCard label="Standard Users" value={stats.totalUsers - stats.adminCount} icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" color="orange" />
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">Audit Logs Ready</p>
                 <span className="text-center font-black text-xs text-primary mt-1">Status: Operational</span>
              </div>
            </>
          )}
        </div>

        {/* Global Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <input 
              type="text" 
              placeholder={activeTab === 'inventory' ? "Search products by name or category..." : "Search users by name or email..."}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {activeTab === 'inventory' && (
            <select 
              className="w-full md:w-56 px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-[10px] uppercase tracking-widest appearance-none cursor-pointer text-gray-600 focus:border-primary transition-colors"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>

        {/* Main Data Table */}
        <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm overflow-x-auto ring-1 ring-black/[0.02]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              {activeTab === 'inventory' ? (
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Product Portfolio</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Classification</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Unit Price</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Operations</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Profile Name</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Email</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Privilege Level</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Registry Date</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activeTab === 'inventory' ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/40 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 border-2 border-gray-50 rounded-2xl p-2 bg-white flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-500 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-gray-900 text-base leading-tight line-clamp-1">{product.name}</span>
                          <span className="text-[10px] text-gray-300 font-black uppercase mt-1">Ref: {product._id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-gray-900 text-lg tracking-tighter">${parseFloat(product.price).toFixed(2)}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                        product.stock === 'In stock' || product.stock > 0
                          ? 'bg-teal-50 text-teal-600 border-teal-100/30' 
                          : 'bg-red-50 text-red-500 border-red-100/30'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          product.stock === 'In stock' || product.stock > 0 ? 'bg-teal-500 animate-pulse' : 'bg-red-500'
                        }`}></span>
                        {product.stock === 'In stock' ? 'Verified' : 'Alert'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-all duration-300">
                        <Link to={`/admin/edit-product/${product._id}`} className="p-3 text-gray-400 hover:text-primary hover:bg-white hover:shadow-xl rounded-xl transition-all border border-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </Link>
                        <button onClick={() => handleDeleteProduct(product._id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-xl rounded-xl transition-all border border-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/40 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-xs shadow-inner">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-black text-gray-900 text-sm tracking-tight">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-500">{user.email}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-black text-gray-300 uppercase">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={user.role === 'admin'}
                        className={`p-3 rounded-xl transition-all ${
                          user.role === 'admin' ? 'text-gray-100 cursor-not-allowed' : 'text-gray-300 hover:text-red-500 hover:bg-white hover:shadow-xl'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {(activeTab === 'inventory' ? filteredProducts : filteredUsers).length === 0 && (
            <div className="py-40 text-center bg-white">
              <p className="text-gray-300 font-black uppercase tracking-[0.2em] text-xs">No records matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Sub-component for Stats
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white border border-gray-200 rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className={`w-14 h-14 bg-${color}-50 rounded-2xl flex items-center justify-center text-${color}-500 mb-5 group-hover:rotate-6 transition-transform`}>
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
    </div>
    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">{label}</p>
    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{value}</h3>
  </div>
)

export default AdminDashboard
