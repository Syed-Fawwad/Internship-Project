import { Link } from 'react-router-dom'

const CategorySection = ({ title, bannerImage, items }) => {
  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-sm">
          {/* Banner Side */}
          <div className="relative w-full lg:w-72 flex-shrink-0 min-h-[260px]">
            <img src={bannerImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative p-6 pt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 whitespace-pre-line">{title}</h2>
              <Link to="/grid" className="inline-block bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors shadow-sm">
                Source now
              </Link>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-grow grid grid-cols-2 md:grid-cols-4">
            {items.map((item, index) => (
              <Link 
                key={index} 
                to={`/product/${item._id || item.id}`} 
                className="p-4 border-r border-b border-gray-100 last:border-r-0 md:even:border-r flex flex-col justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                  <p className="text-gray-400 text-xs mt-1">From <br />USD {item.price}</p>
                </div>
                <div className="self-end w-20 h-20 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection

