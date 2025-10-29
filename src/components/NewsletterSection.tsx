'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToast } from '@/store/slices/toastSlice'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      dispatch(addToast({
        type: 'error',
        title: 'Email Required',
        message: 'Please enter your email address.'
      }))
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      dispatch(addToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      }))
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      dispatch(addToast({
        type: 'success',
        title: 'Subscribed Successfully!',
        message: 'Thank you for subscribing to our newsletter.'
      }))
      setEmail('')
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Subscription Failed',
        message: 'Please try again later.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            BECOME A MEMBER AND GET EXCLUSIVE DEALS
          </h2>
          <p className="text-gray-600 text-lg">
            Subscribe to our newsletter to stay in the loop.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email here..."
              className="flex-1 px-4 py-3 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-pink-600 text-white px-6 py-3 rounded-r-md hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                '→'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewsletterSection