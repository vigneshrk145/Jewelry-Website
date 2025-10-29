'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

const shapes = [
  { id: 1, name: 'ROUND', image: '/diamondshape/diamond.png' },
  { id: 2, name: 'HEART', image: '/diamondshape/heart.png' },
  { id: 3, name: 'RADIANT', image: '/diamondshape/ratiant.png' },
  { id: 4, name: 'PRINCESS', image: '/diamondshape/princess.png' },
  { id: 5, name: 'PEAR', image: '/diamondshape/pear.png' },
  { id: 6, name: 'OVAL', image: '/diamondshape/oval.png' }
]

const ShopByShape = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6) // Default for desktop
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2) // Mobile: 2 items
      } else if (window.innerWidth < 768) {
        setItemsPerPage(3) // Small tablets: 3 items
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4) // Tablets: 4 items
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(5) // Small desktop: 5 items
      } else {
        setItemsPerPage(6) // Large desktop: 6 items
      }
    }
    
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Reset to first slide when itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerPage])
  
  const maxIndex = Math.max(0, Math.ceil(shapes.length / itemsPerPage) - 1)
  
  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1)
    }
  }
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }
  
  const canGoNext = currentIndex < maxIndex
  const canGoPrev = currentIndex > 0
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            SHOP BY SHAPE
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">
            Every Diamond Tells a Story So Find Yours
          </p>
         
        </div>

        <div className="relative">
          {/* Navigation Arrows - Only show when needed */}
          {canGoPrev && (
            <button 
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 text-gray-600 transition-all duration-200 hover:scale-105"
              aria-label="Previous shapes"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {canGoNext && (
            <button 
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 text-gray-600 transition-all duration-200 hover:scale-105"
              aria-label="Next shapes"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Shapes Grid */}
          <div className="overflow-hidden px-8 sm:px-12 lg:px-16">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out touch-pan-y select-none"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                width: '100%'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Diamond shapes carousel"
            >
              {Array.from({ length: Math.ceil(shapes.length / itemsPerPage) }, (_, pageIndex) => (
                <div 
                  key={pageIndex}
                  className="flex shrink-0 w-full"
                >
                  {shapes
                    .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                    .map((shape) => (
                    <div
                      key={shape.id}
                      className="text-center group cursor-pointer px-1 sm:px-2 lg:px-3 select-none shrink-0"
                      style={{ width: `${100 / itemsPerPage}%` }}
                    >
                  {/* Shape Image */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 mx-auto mb-3 sm:mb-4 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 p-3 sm:p-4 lg:p-6 group-active:scale-95">
                    <div className="relative w-full h-full">
                      <Image
                        src={shape.image}
                        alt={shape.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 160px"
                      />
                    </div>
                  </div>
                  
                  {/* Shape Name */}
                  <h3 className="text-xs sm:text-sm lg:text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {shape.name}
                  </h3>
                </div>
              ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots - Only show when needed */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 touch-manipulation ${
                    index === currentIndex 
                      ? 'bg-gray-800 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ShopByShape