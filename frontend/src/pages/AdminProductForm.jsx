import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'

const AdminProductForm = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const [token] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    images: '', // Comma separated string for input
    category: 'Tech',
    description: '',
    stock: 'In stock',
    featured: false,
  })

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await api.getProduct(id)
          // API returns the object directly
          const p = res
          if (p) {
            setFormData({
              name: p.name || '',
              price: p.price || '',
              originalPrice: p.originalPrice || '',
              image: p.image || '',
              images: p.images ? p.images.join(', ') : '',
              category: p.category || 'Tech',
              description: p.description || '',
              stock: p.stock || 'In stock',
              featured: p.featured || false,
            })
          }
        } catch (error) {
          console.error('Error fetching product for edit:', error)
        }
      }
      fetchProduct()
    }
  }, [id, isEdit])

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Prepare data for API
    const productData = {
      ...formData,
      images: formData.images.split(',').map(img => img.trim()).filter(img => img !== ''),
    }

    try {
      if (isEdit) {
        await api.updateProduct(id, productData, token)
      } else {
        await api.createProduct(productData, token)
      }
      navigate('/admin')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/admin" className="text-primary font-bold text-sm flex items-center gap-2 hover:underline mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Product Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50"
                value={formData.name}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Price (USD)</label>
              <input
                name="price"
                type="number"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50"
                value={formData.price}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Original Price</label>
              <input
                name="originalPrice"
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50"
                value={formData.originalPrice}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Category</label>
              <select
                name="category"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50 appearance-none"
                value={formData.category}
                onChange={onChange}
              >
                <option value="Tech">Tech</option>
                <option value="Clothing">Clothing</option>
                <option value="Interior">Interior</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Stock Status</label>
              <select
                name="stock"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50 appearance-none"
                value={formData.stock}
                onChange={onChange}
              >
                <option value="In stock">In stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Main Image URL</label>
              <input
                name="image"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50"
                value={formData.image}
                onChange={onChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Gallery Images (comma separated URLs)</label>
              <textarea
                name="images"
                rows="2"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50"
                value={formData.images}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Description</label>
              <textarea
                name="description"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/50"
                value={formData.description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                className="w-5 h-5 text-primary border-gray-300 rounded-lg focus:ring-primary cursor-pointer"
                checked={formData.featured}
                onChange={onChange}
              />
              <label htmlFor="featured" className="text-sm font-bold text-gray-700 cursor-pointer uppercase tracking-wider">Featured Product</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
          >
            {loading ? 'Processing...' : (isEdit ? 'Update Product' : 'Create Product')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminProductForm

