'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { removeFromWishlist, clearWishlist } from '@/store/slices/wishlistSlice'
import { addToCart } from '@/store/slices/cartSlice'
import { addToast } from '@/store/slices/toastSlice'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const WishlistPage = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const handleRemoveFromWishlist = (id: string, name: string) => {
    dispatch(removeFromWishlist(id))
    dispatch(addToast({
      type: 'success',
      title: 'Removed from Wishlist',
      message: `${name} has been removed from your wishlist.`
    }))
  }

  const handleMoveToCart = (item: typeof wishlistItems[0]) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    }))
    dispatch(removeFromWishlist(item.id))
    dispatch(addToast({
      type: 'success',
      title: 'Moved to Cart',
      message: `${item.name} has been moved to your cart.`
    }))
  }

  const handleClearWishlist = () => {
    dispatch(clearWishlist())
    dispatch(addToast({
      type: 'success',
      title: 'Wishlist Cleared',
      message: 'All items have been removed from your wishlist.'
    }))
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      dispatch(addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }))
    })
    dispatch(clearWishlist())
    dispatch(addToast({
      type: 'success',
      title: 'All Items Moved to Cart',
      message: `${wishlistItems.length} items have been moved to your cart.`
    }))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">Discover beautiful jewelry pieces and add them to your wishlist!</p>
            <Link
              href="/"
              className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-colors inline-block"
            >
              Explore Collection
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleMoveAllToCart}
            className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors font-medium"
          >
            Move All to Cart
          </button>
          <button
            onClick={handleClearWishlist}
            className="border border-red-300 text-red-600 px-6 py-3 rounded-md hover:bg-red-50 transition-colors font-medium"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group">
              <div className="relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    ${item.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors font-medium"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Wishlist Badge */}
                <div className="absolute top-4 left-4 bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-medium">
                  ♥ Wishlist
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Recently Viewed or Recommended Section */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Discover more beautiful jewelry pieces</p>
            <Link
              href="/"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors inline-block"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default WishlistPage