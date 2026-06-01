import { useState, useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Deals from '../components/Deals/Deals'
import CategorySection from '../components/CategorySection/CategorySection'
import Inquiry from '../components/Inquiry/Inquiry'
import Recommended from '../components/Recommended/Recommended'
import Services from '../components/Services/Services'
import Suppliers from '../components/Suppliers/Suppliers'
import Newsletter from '../components/Newsletter/Newsletter'
import { api } from '../utils/api'

// Stable mock data for homepage restoration
const MOCK_TECH = [
  { id: 1, name: 'Smart watches', price: '19', image: '/src/assets/Image/tech/image 23.png' },
  { id: 2, name: 'Cameras', price: '89', image: '/src/assets/Image/tech/image 32.png' },
  { id: 3, name: 'Headphones', price: '10', image: '/src/assets/Image/tech/8.png' },
  { id: 4, name: 'Smartphones', price: '90', image: '/src/assets/Image/tech/image 33.png' },
  { id: 5, name: 'Gaming set', price: '35', image: '/src/assets/Image/tech/6.png' },
  { id: 6, name: 'Laptops & PC', price: '340', image: '/src/assets/Image/tech/image 29.png' },
  { id: 7, name: 'Tablets', price: '19', image: '/src/assets/Image/tech/6.png' },
  { id: 8, name: 'Accessories', price: '240', image: '/src/assets/Image/tech/image 85.png' },
]

const MOCK_CLOTHING = [
  { id: 11, name: 'Soft chairs', price: '19', image: '/src/assets/Image/interior/8.png' },
  { id: 12, name: 'Sofa & chair', price: '19', image: '/src/assets/Image/interior/7.png' },
  { id: 13, name: 'Kitchen dishes', price: '19', image: '/src/assets/Image/interior/image 93.png' },
  { id: 14, name: 'Smart watches', price: '19', image: '/src/assets/Image/interior/1.png' },
  { id: 15, name: 'Kitchen mixer', price: '100', image: '/src/assets/Image/interior/image 89.png' },
  { id: 16, name: 'Blenders', price: '39', image: '/src/assets/Image/interior/9.png' },
  { id: 17, name: 'Home appliance', price: '19', image: '/src/assets/Image/interior/3.png' },
  { id: 18, name: 'Coffee maker', price: '10', image: '/src/assets/Image/interior/image 93.png' },
]

const Home = () => {
  const [homeAndOutdoorItems, setHomeAndOutdoorItems] = useState(MOCK_CLOTHING)
  const [electronicsItems, setElectronicsItems] = useState(MOCK_TECH)
  const [loading, setLoading] = useState(false) // Set to false to prioritize immediate render

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clothingRes = await api.getProducts('category=Clothing')
        const techRes = await api.getProducts('category=Tech')
        
        if (clothingRes && clothingRes.length > 0) {
          setHomeAndOutdoorItems(clothingRes.slice(0, 8))
        }
        
        if (techRes && techRes.length > 0) {
          setElectronicsItems(techRes.slice(0, 8))
        }
      } catch (error) {
        console.warn('Backend API not available, using mock data for homepage')
      }
    }
    fetchData()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <Deals />
      
      <CategorySection
        title={`Home and\noutdoor`}
        bannerImage="/src/assets/Image/backgrounds/Group 969.png"
        items={homeAndOutdoorItems}
      />
      
      <CategorySection
        title={`Consumer\nelectronics and\ngadgets`}
        bannerImage="/src/assets/Image/backgrounds/image 98.png"
        items={electronicsItems}
      />
      
      <Inquiry />
      <Recommended />
      <Services />
      <Suppliers />
      <Newsletter />
    </div>
  )
}

export default Home
