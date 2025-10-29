'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addToCart } from '@/store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice'
import { addToast } from '@/store/slices/toastSlice'
import { openWishlistDrawer } from '@/store/slices/uiSlice'
import Image from 'next/image'

const products = [
  {
    id: '1',
    name: 'PEARLS BY THE YARD',
    price: 725,
    image: '/newarrival/pearls1.jpg',
    category: 'Ring'
  },
  {
    id: '2',
    name: 'PEARLS BY THE YARD',
    price: 725,
    image: '/newarrival/pearls2.jpg',
    category: 'Earrings'
  },
  {
    id: '3',
    name: 'PEARLS BY THE YARD',
    price: 725,
    image: '/newarrival/pearls3.jpg',
    category: 'Necklace'
  },
  {
    id: '4',
    name: 'PEARLS BY THE YARD',
    price: 725,
    image: '/newarrival/pearls4.jpg',
    category: 'Bracelet'
  },
  {
    id: '5',
    name: 'PEARLS BY THE YARD',
    price: 725,
    image: '/newarrival/pearls5.jpg',
    category: 'Earrings'
  },
  {
    id: '6',
    name: 'PEARLS BY THE YARD',
    price: 725,
    image: '/newarrival/pearls6.jpg',
    category: 'Pendant'
  }
]

const tabs = ['NEW ARRIVAL', 'BEST SELLER', 'TRENDING']

const ProductGrid = () => {
  const [activeTab, setActiveTab] = useState('NEW ARRIVAL')
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const handleAddToCart = (product: typeof products[0]) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }))
    dispatch(addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`
    }))
  }

  const handleAddToWishlist = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id))
      dispatch(addToast({
        type: 'success',
        title: 'Removed from Wishlist',
        message: `${product.name} has been removed from your wishlist.`
      }))
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }))
      dispatch(addToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: `${product.name} has been added to your wishlist.`
      }))
    }
    
    // Open the wishlist drawer to show the updated wishlist
    dispatch(openWishlistDrawer())
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-gray-50 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Wishlist Button */}
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <svg 
                    className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-pink-500'}`} 
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 bg-white">
                  <div className="text-center">
                    <p className="text-pink-600 text-lg font-bold mb-1">
                      ${product.price}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customize Button */}
        <div className="text-center">
          <button className="border border-pink-600 text-pink-600 px-8 py-3 text-sm font-medium hover:bg-pink-50 transition-colors tracking-wide">
            CUSTOMIZE
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid