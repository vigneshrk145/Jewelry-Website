'use client'

const CustomSection = () => {
  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/makeyour.jpg')"
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0  bg-opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-end pb-16 md:pb-20">
        <div className="w-full max-w-2xl">
          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              MAKE YOUR OWN
            </h2>
            
            <div className="space-y-1 md:space-y-2">
              <p className="text-base md:text-lg text-white leading-relaxed">
                DESIGN A PIECE <span className="font-semibold">THAT&apos;S TRULY YOURS</span>, PERSONALIZED,
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed">
                ENGRAVED, AND <span className="font-semibold">CRAFTED TO REFLECT YOUR UNIQUE</span>
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed">
                STYLE.
              </p>
            </div>
            
            <button className="border border-white text-white px-6 py-2 md:px-8 md:py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 mt-4 md:mt-6">
              CUSTOMIZE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomSection