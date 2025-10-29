'use client'

import Image from 'next/image'

const categories = [
  {
    id: 1,
    name: 'EARRINGS',
    image: '/shopcatageroy/earings.png',
    description: 'Elegant earrings for every occasion',
    position: 'top-left'
  },
  {
    id: 2,
    name: 'BRACELET', 
    image: '/shopcatageroy/bracelet.jpg',
    description: 'Beautiful bracelets to adorn your wrists',
    position: 'top-right'
  },
  {
    id: 3,
    name: 'RINGS',
    image: '/shopcatageroy/ring.jpg',
    description: 'Stunning rings for special moments',
    position: 'bottom-left'
  },
  {
    id: 4,
    name: 'EARRINGS',
    image: '/shopcatageroy/earingscenter.png',
    description: 'Premium earring collection',
    position: 'center'
  },
  {
    id: 5,
    name: 'WEDDING',
    image: '/shopcatageroy/wedding.jpg',
    description: 'Perfect jewelry for your special day',
    position: 'bottom-right'
  }
]

const ShopByCategory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SHOP BY CATEGORY
          </h2>
          <p className="text-gray-600 text-lg">
            Discover Jewelry Designed for Every Mood and Moment
          </p>
        </div>

        {/* Custom Grid Layout matching the design - 2 rows, 3 columns */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
          {/* Top Left - EARRINGS */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg col-span-1 row-span-1">
            <div className="relative w-full h-full">
              <Image
                src={categories[0].image}
                alt={categories[0].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg md:text-xl font-bold">{categories[0].name}</h3>
              </div>
            </div>
          </div>

          {/* Center Column - Large EARRINGS (spans 2 rows) */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg col-span-1 row-span-2">
            <div className="relative w-full h-full">
              <Image
                src={categories[3].image}
                alt={categories[3].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold">{categories[3].name}</h3>
              </div>
            </div>
          </div>

          {/* Top Right - BRACELET */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg col-span-1 row-span-1">
            <div className="relative w-full h-full">
              <Image
                src={categories[1].image}
                alt={categories[1].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg md:text-xl font-bold">{categories[1].name}</h3>
              </div>
            </div>
          </div>

          {/* Bottom Left - RINGS */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg col-span-1 row-span-1">
            <div className="relative w-full h-full">
              <Image
                src={categories[2].image}
                alt={categories[2].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg md:text-xl font-bold">{categories[2].name}</h3>
              </div>
            </div>
          </div>

          {/* Bottom Right - WEDDING */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg col-span-1 row-span-1">
            <div className="relative w-full h-full">
              <Image
                src={categories[4].image}
                alt={categories[4].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg md:text-xl font-bold">{categories[4].name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory