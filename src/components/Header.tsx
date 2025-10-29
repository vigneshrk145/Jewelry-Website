'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { toggleWishlistDrawer } from '@/store/slices/uiSlice'
import { hydrate as hydrateWishlist } from '@/store/slices/wishlistSlice'
import { hydrate as hydrateCart } from '@/store/slices/cartSlice'
import WishlistDrawer from './WishlistDrawer'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isWishlistOpen = useSelector((state: RootState) => state.ui.isWishlistDrawerOpen)
  const cartHydrated = useSelector((state: RootState) => state.cart.isHydrated)
  const wishlistHydrated = useSelector((state: RootState) => state.wishlist.isHydrated)

  useEffect(() => {
    // Hydrate the store from localStorage
    dispatch(hydrateCart())
    dispatch(hydrateWishlist())
    setIsHydrated(true)
  }, [dispatch])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Only show dynamic content after hydration to prevent mismatch
  const showDynamicContent = isHydrated && cartHydrated && wishlistHydrated

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Top Banner */}
      <div className="bg-pink-600 text-white text-center py-2 px-4 text-xs sm:text-sm relative z-50">
        <span className="font-medium">SIGNUP AND GET 10% OFF</span>
      </div>
      
      {/* Main Header */}
      <div className="relative">
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-pink-600 transition-colors">
                NIORA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link href="/new-arrival" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                NEW ARRIVAL
              </Link>
              <Link href="/custom-jewellery" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                CUSTOM JEWELLERY
              </Link>
              <Link href="/try-at-home" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                TRY AT HOME
              </Link>
              <Link href="/education-hub" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                EDUCATION HUB
              </Link>
              <Link href="/about-us" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                ABOUT US
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Search Icon - Mobile & Tablet */}
              <button className="lg:hidden text-gray-700 hover:text-pink-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <button 
                onClick={() => dispatch(toggleWishlistDrawer())}
                className="text-gray-700 hover:text-pink-600 relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Open wishlist"
              >
                <svg 
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${showDynamicContent && wishlistItems.length > 0 ? 'fill-red-500 text-red-500' : ''}`} 
                  fill={showDynamicContent && wishlistItems.length > 0 ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {showDynamicContent && wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs font-medium">
                    {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <Link href="/cart" className="text-gray-700 hover:text-pink-600 relative p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="View cart">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6M9 17h6" />
                </svg>
                {showDynamicContent && cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs font-medium">
                    {cartItems.length > 9 ? '9+' : cartItems.length}
                  </span>
                )}
              </Link>

              {/* Contact - Hidden on mobile */}
              <Link href="/contact" className="hidden md:block text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                CONTACT
              </Link>

              {/* Login - Hidden on small screens */}
              <Link href="/login" className="hidden sm:block text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors whitespace-nowrap">
                LOGIN
              </Link>

              {/* Signup */}
              <Link href="/signup" className="bg-pink-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded hover:bg-pink-700 active:bg-pink-800 transition-colors whitespace-nowrap">
                SIGN UP
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-pink-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg z-50">
              <div className="px-3 py-3 space-y-1 max-h-96 overflow-y-auto">
                <Link 
                  href="/new-arrival" 
                  className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NEW ARRIVAL
                </Link>
                <Link 
                  href="/custom-jewellery" 
                  className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CUSTOM JEWELLERY
                </Link>
                <Link 
                  href="/try-at-home" 
                  className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  TRY AT HOME
                </Link>
                <Link 
                  href="/education-hub" 
                  className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EDUCATION HUB
                </Link>
                <Link 
                  href="/about-us" 
                  className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT US
                </Link>
                
                {/* Mobile-only menu items */}
                <div className="pt-3 border-t border-gray-200 mt-3">
                  <Link 
                    href="/contact" 
                    className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CONTACT
                  </Link>
                  <Link 
                    href="/login" 
                    className="block px-3 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors font-medium sm:hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      </div>

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen} 
        onClose={() => dispatch(toggleWishlistDrawer())} 
      />
    </>
  )
}

export default Header