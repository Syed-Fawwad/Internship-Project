import { useState } from 'react'

const ProductTabs = ({ description, specs }) => {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'about', label: 'About company' },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 uppercase tracking-wider ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none text-gray-600">
            <p className="mb-6 leading-relaxed">{description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}</p>
            <table className="w-full border-collapse border border-gray-100 text-sm">
              <tbody>
                {(specs || [
                  { label: 'Model', value: '#123456' },
                  { label: 'Style', value: 'Classic style' },
                  { label: 'Certificate', value: 'ISO-9001' },
                  { label: 'Size', value: '34mm x 450mm x 19mm' },
                  { label: 'Memory', value: '32GB RAM' },
                ]).map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-100 p-3 font-medium text-gray-500 w-1/3 uppercase text-[11px] tracking-wider">{spec.label}</td>
                    <td className="border border-gray-100 p-3 text-gray-700 font-bold">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-8 space-y-3 list-none">
              {[
                'Some great feature of this product that stands out',
                'Another amazing benefit for the user described here',
                'High quality materials and craftsmanship in every detail',
                'Eco-friendly and sustainable production processes'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-500">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'reviews' && <p className="text-gray-400 italic">No reviews yet. Be the first to review!</p>}
        {activeTab === 'shipping' && <p className="text-gray-400 italic">Shipping information and policies...</p>}
        {activeTab === 'about' && <p className="text-gray-400 italic">Information about the seller and brand...</p>}
      </div>
    </div>
  )
}

export default ProductTabs
