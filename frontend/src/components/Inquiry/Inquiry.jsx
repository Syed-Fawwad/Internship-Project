const Inquiry = () => {
  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden min-h-[400px] flex items-center">
          {/* Background Image */}
          <img
            src="/assets/Image/backgrounds/Group 982.png"
            alt="Warehouse Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-80"></div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between p-10 gap-10">
            {/* Left Content */}
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-gray-100 opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>

            {/* Right Form Card */}
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send quote to suppliers</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="What item you need?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Type more details"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Quantity"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="w-32">
                    <div className="relative">
                      <select className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white cursor-pointer">
                        <option>Pcs</option>
                        <option>Kg</option>
                        <option>Box</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
                  Send inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Inquiry
