'use client'

const LabGrownSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Video */}
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/labgrown.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              BRILLIANCE OF LAB
              <span className="block">GROWN DIAMONDS</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed max-w-md">
              Design jewelry that tells your story. From gemstone choices to engravings, make it yours 
              crafted with care, just for you.
            </p>
            
            <button className="border border-pink-500 text-pink-500 px-8 py-3 text-sm font-medium hover:bg-pink-50 transition-colors rounded">
              CUSTOMIZE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LabGrownSection