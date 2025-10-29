'use client'

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/homeimage.jpg')",
        backgroundPosition: 'center right'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-wide">
              GIFT THE
              <span className="block">GLOW</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white font-light max-w-md leading-relaxed">
              FRESH DESIGNS THAT SPARKLE AS<br />
              BRIGHT AS YOU DO.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-pink-600 text-white px-10 py-4 text-sm font-semibold tracking-wider hover:bg-pink-700 transition-colors duration-300 uppercase">
                SHOP NOW
              </button>
              <button className="border-2 border-white text-white px-10 py-4 text-sm font-semibold tracking-wider hover:bg-white hover:text-gray-900 transition-colors duration-300 uppercase">
                CUSTOMIZE
              </button>
            </div>
          </div>

          {/* Right side - Image is now background, so this can be empty or used for additional content */}
          <div className="hidden lg:block">
            {/* This space is intentionally left for the background image to show through */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection