'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-pink-600 mb-4 block">
              NIORA
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Crafting beautiful jewelry that tells your unique story.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About us</Link></li>
              <li><Link href="/different" className="text-gray-600 hover:text-gray-900 text-sm">Why we are different</Link></li>
              <li><Link href="/lab-diamonds" className="text-gray-600 hover:text-gray-900 text-sm">Lab grown diamonds</Link></li>
              <li><Link href="/why-us" className="text-gray-600 hover:text-gray-900 text-sm">Why us</Link></li>
              <li><Link href="/purpose" className="text-gray-600 hover:text-gray-900 text-sm">Our purpose</Link></li>
              <li><Link href="/story" className="text-gray-600 hover:text-gray-900 text-sm">Story Glimpse</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">SUPPORT</h3>
            <ul className="space-y-3">
              <li><Link href="/chat" className="text-gray-600 hover:text-gray-900 text-sm">Chat Now</Link></li>
              <li><Link href="/resizing" className="text-gray-600 hover:text-gray-900 text-sm">Free Resizing</Link></li>
              <li><Link href="/track-order" className="text-gray-600 hover:text-gray-900 text-sm">Track your Order</Link></li>
              <li><Link href="/education" className="text-gray-600 hover:text-gray-900 text-sm">Education</Link></li>
              <li><Link href="/review" className="text-gray-600 hover:text-gray-900 text-sm">Review</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">SERVICES</h3>
            <ul className="space-y-3">
              <li><Link href="/shipping" className="text-gray-600 hover:text-gray-900 text-sm">Free Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-gray-900 text-sm">Return Policy</Link></li>
              <li><Link href="/warranty" className="text-gray-600 hover:text-gray-900 text-sm">Lifetime Warranty</Link></li>
              <li><Link href="/order-status" className="text-gray-600 hover:text-gray-900 text-sm">Order Status</Link></li>
              <li><Link href="/cancellation" className="text-gray-600 hover:text-gray-900 text-sm">Cancellation</Link></li>
              <li><Link href="/certifications" className="text-gray-600 hover:text-gray-900 text-sm">Certifications</Link></li>
              <li><Link href="/buyback" className="text-gray-600 hover:text-gray-900 text-sm">Buyback</Link></li>
            </ul>
          </div>
        </div>

       
    
        {/* Copyright */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          {/* Mobile Layout - Stack vertically */}
          <div className="flex flex-col space-y-4 md:hidden">
            {/* Payment Icons */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">RUPAY</span>
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-800">VISA</span>
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">UPI</span>
              </div>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center">
              © 2025 — Copyright All Right Reserved
            </p>
            
            {/* Privacy Policy */}
            <div className="text-center">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:flex justify-between items-center">
            {/* Payment Icons */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">RUPAY</span>
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-800">VISA</span>
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">UPI</span>
              </div>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © 2025 — Copyright All Right Reserved
            </p>
            
            {/* Privacy Policy */}
            <div>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer