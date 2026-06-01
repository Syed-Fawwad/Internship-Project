const Newsletter = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
