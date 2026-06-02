import { Link } from 'react-router-dom'

const Hero = () => {
  const categories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category',
  ]

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col lg:flex-row gap-4">
          {/* Sidebar Categories */}
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <nav className="flex flex-col">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to="/list"
                  className={`px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors ${
                    index === 0 ? 'bg-blue-50 text-blue-600 font-medium' : ''
                  }`}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Banner */}
          <div className="flex-grow relative rounded-lg overflow-hidden h-[400px]">
            <img
              src="/assets/Image/backgrounds/Banner-board-800x420 2.png"
              alt="Latest trending Electronic items"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-12 left-12 max-w-xs">
              <h2 className="text-2xl text-gray-800 mb-2">Latest trending</h2>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Electronic items</h1>
              <Link to="/grid" className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors shadow-sm">
                Source now
              </Link>
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-64 flex flex-col gap-4">
            {/* User Card */}
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 leading-tight">Hi, user</p>
                  <p className="text-gray-800 leading-tight">let's get started</p>
                </div>
              </div>
              <button className="bg-primary text-white w-full py-2 rounded-md text-sm font-medium mb-2 hover:bg-primary-700 transition-colors">
                Join now
              </button>
              <button className="bg-white text-primary border border-gray-200 w-full py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                Log in
              </button>
            </div>

            {/* Promo Card 1 */}
            <div className="bg-orange-500 rounded-lg p-4 h-full flex flex-col justify-center">
              <p className="text-white font-medium text-sm leading-snug">
                Get US $10 off with a new supplier
              </p>
            </div>

            {/* Promo Card 2 */}
            <div className="bg-teal-500 rounded-lg p-4 h-full flex flex-col justify-center">
              <p className="text-white font-medium text-sm leading-snug">
                Send quotes with supplier preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

