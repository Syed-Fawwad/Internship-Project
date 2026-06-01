const Pagination = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 py-6 border-t border-gray-200 mt-6">
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Show</span>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
        <button className="px-3 py-2 hover:bg-gray-50 border-r border-gray-300 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-900 border-r border-gray-300">1</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors">2</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors">3</button>
        <button className="px-3 py-2 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination
