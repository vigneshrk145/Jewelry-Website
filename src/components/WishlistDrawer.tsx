'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { removeFromWishlist } from '@/store/slices/wishlistSlice'
import { addToCart } from '@/store/slices/cartSlice'
import { addToast } from '@/store/slices/toastSlice'
import Image from 'next/image'
import Link from 'next/link'

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const WishlistDrawer = ({ isOpen, onClose }: WishlistDrawerProps) => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id))
    dispatch(addToast({
      type: 'success',
      title: 'Removed from Wishlist',
      message: 'Item has been removed from your wishlist.'
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

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 md:w-md lg:w-lg max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b bg-gray-50 shrink-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
              My Wishlist
            </h2>
            <span className="bg-pink-100 text-pink-800 text-xs sm:text-sm px-2 py-1 rounded-full font-medium">
              {wishlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-full transition-colors border border-gray-300 bg-white shadow-sm touch-manipulation"
            aria-label="Close wishlist"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-3 sm:p-4 lg:p-6 h-full">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-6 sm:py-8 lg:py-12 h-full flex flex-col justify-center px-4">
                <div className="text-gray-400 mb-3 sm:mb-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 max-w-xs mx-auto">Start adding items you love to see them here!</p>
                <button
                  onClick={onClose}
                  className="bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-pink-700 transition-colors mx-auto touch-manipulation min-h-11 flex items-center"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow bg-white">
                    <div className="flex space-x-3 sm:space-x-4">
                      {/* Product Image */}
                      <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-pink-600 mt-1 sm:mt-2">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full shrink-0 touch-manipulation"
                        title="Remove from wishlist"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-3 sm:mt-4">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-pink-600 text-white text-sm sm:text-base py-3 px-4 rounded-md hover:bg-pink-700 active:bg-pink-800 transition-colors font-medium touch-manipulation min-h-11 flex items-center justify-center"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6M9 17h6" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t p-3 sm:p-4 lg:p-6 bg-gray-50 shrink-0">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="w-full bg-gray-800 text-white py-3 sm:py-4 text-sm sm:text-base rounded-md hover:bg-gray-900 active:bg-gray-700 transition-colors font-medium text-center touch-manipulation min-h-11 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              View All Wishlist Items ({wishlistItems.length})
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default WishlistDrawer