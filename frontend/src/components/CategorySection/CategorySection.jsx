import { Link } from 'react-router-dom'

const CategorySection = ({ title, bannerImage, items }) => {
  return (
    <section className="bg-gray-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-3xl flex flex-col lg:flex-row overflow-hidden shadow-sm">
          {/* Banner Side */}
          <div className="relative w-full lg:w-72 flex-shrink-0 min-h-[220px] md:min-h-[260px]">
            <img src={bannerImage} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-black/10"></div>
            <div className="relative p-8 flex flex-col h-full justify-center lg:justify-start">
              <h2 className="text-2xl md:text-xl font-black text-white lg:text-gray-900 mb-6 whitespace-pre-line tracking-tight leading-tight drop-shadow-sm lg:drop-shadow-none">{title}</h2>
              <Link to="/grid" className="inline-block bg-white text-gray-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95 w-fit">
                Source now
              </Link>
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-grow">
            {/* Horizontal Scroll on Mobile, Grid on Desktop */}
            <div className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-x-visible hide-scrollbar snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0">
              {items.map((item, index) => (
                <Link 
                  key={index} 
                  to={`/product/${item._id || item.id}`} 
                  className="min-w-[180px] md:min-w-0 p-6 border-r border-b border-gray-100 last:border-r-0 flex flex-col justify-between hover:bg-gray-50/50 transition-all cursor-pointer group snap-start"
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 leading-relaxed h-10">{item.name}</h3>
                    <p className="text-gray-400 text-[10px] mt-2 font-black uppercase tracking-widest flex items-center gap-1">
                      From <span className="text-gray-900 text-xs font-black tracking-tighter">USD {item.price}</span>
                    </p>
                  </div>
                  <div className="self-end w-24 h-24 flex items-center justify-center overflow-hidden bg-white p-2 rounded-2xl group-hover:shadow-md transition-all duration-500 ring-1 ring-black/[0.02]">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection

