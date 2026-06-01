const Suppliers = () => {
  const suppliers = [
    { name: 'Arabic Emirates', site: 'shopname.ae', flag: '/src/assets/Layout1/Image/flags/AE@2x.png' },
    { name: 'Australia', site: 'shopname.ae', flag: '/src/assets/Layout1/Image/flags/icon.png' }, // icon.png seems to be Aussie flag in some contexts, let me double check or use a placeholder
    { name: 'United States', site: 'shopname.ae', flag: '/src/assets/Layout1/Image/flags/US@2x.png' },
    { name: 'Russia', site: 'shopname.ru', flag: '/src/assets/Layout1/Image/flags/RU@2x.png' },
    { name: 'Italy', site: 'shopname.it', flag: '/src/assets/Layout1/Image/flags/IT@2x.png' },
    { name: 'Denmark', site: 'denmark.com.dk', flag: '/src/assets/Layout1/Image/flags/DK@2x.png' },
    { name: 'France', site: 'shopname.com.fr', flag: '/src/assets/Layout1/Image/flags/FR@2x.png' },
    { name: 'Arabic Emirates', site: 'shopname.ae', flag: '/src/assets/Layout1/Image/flags/AE@2x.png' },
    { name: 'China', site: 'shopname.ae', flag: '/src/assets/Layout1/Image/flags/CN@2x.png' },
    { name: 'Great Britain', site: 'shopname.co.uk', flag: '/src/assets/Layout1/Image/flags/GB@2x.png' },
  ]

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Suppliers by region</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-4">
          {suppliers.map((supplier, index) => (
            <div key={index} className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-md transition-colors">
              <img src={supplier.flag} alt={supplier.name} className="w-7 h-5 object-cover" />
              <div>
                <p className="text-gray-900 text-sm font-medium leading-none">{supplier.name}</p>
                <p className="text-gray-400 text-xs mt-1">{supplier.site}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Suppliers
