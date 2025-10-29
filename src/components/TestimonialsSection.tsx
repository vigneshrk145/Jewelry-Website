'use client'

import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    video: "/customersay1.mp4",
    text: "Can you guess where I was that magical diamond?",
    overlay: "Beautiful ring showcase"
  },
  {
    id: 2,
    video: "/customersay2.mp4", 
    text: "Thank you Tara Hannam and great staff for a lovely gift for me",
    overlay: "Customer appreciation"
  },
  {
    id: 3,
    video: "/customersay3.mp4",
    text: "Absolutely stunning jewelry! The quality exceeded my expectations",
    overlay: "Ring fitting perfectly"
  }
]

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Video Testimonials Grid */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-12">
            {/* Left Video */}
            <div className="relative group cursor-pointer flex-shrink-0">
              <div className="relative w-48 md:w-52 h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={testimonials[0].video} type="video/mp4" />
                </video>
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-xs font-medium leading-relaxed">
                    Can you guess where I was that magical diamond?
                  </p>
                </div>
              </div>
            </div>

            {/* Center Video (Larger) */}
            <div className="relative group cursor-pointer flex-shrink-0">
              <div className="relative w-56 md:w-72 h-88 md:h-[28rem] rounded-lg overflow-hidden shadow-lg">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={testimonials[1].video} type="video/mp4" />
                </video>
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    Thank you Tara Hannam and great staff for a lovely gift for me
                  </p>
                </div>
              </div>
            </div>

            {/* Right Video */}
            <div className="relative group cursor-pointer flex-shrink-0">
              <div className="relative w-48 md:w-52 h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={testimonials[2].video} type="video/mp4" />
                </video>
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-xs font-medium leading-relaxed">
                    Absolutely stunning jewelry! The quality exceeded my expectations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection