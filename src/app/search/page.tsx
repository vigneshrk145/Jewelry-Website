'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addToCart } from '@/store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice'
import { addToast } from '@/store/slices/toastSlice'
import { openWishlistDrawer } from '@/store/slices/uiSlice'

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Diamond Engagement Ring',
    price: 2500,
    image: '/newarrival/pearls1.jpg',
    category: 'Rings',
    shape: 'Round',
    metal: 'Gold'
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    price: 725,
    image: '/newarrival/pearls2.jpg',
    category: 'Necklaces',
    shape: 'Round',
    metal: 'Silver'
  },
  {
    id: '3',
    name: 'Gold Bracelet',
    price: 850,
    image: '/newarrival/pearls3.jpg',
    category: 'Bracelets',
    shape: 'Oval',
    metal: 'Gold'
  },
  {
    id: '4',
    name: 'Silver Earrings',
    price: 425,
    image: '/newarrival/pearls4.jpg',
    category: 'Earrings',
    shape: 'Heart',
    metal: 'Silver'
  },
  {
    id: '5',
    name: 'Tennis Bracelet',
    price: 1200,
    image: '/newarrival/pearls5.jpg',
    category: 'Bracelets',
    shape: 'Round',
    metal: 'Gold'
  },
  {
    id: '6',
    name: 'Statement Necklace',
    price: 950,
    image: '/newarrival/pearls6.jpg',
    category: 'Necklaces',
    shape: 'Princess',
    metal: 'Gold'
  }
]

// Separate component that uses useSearchParams
const SearchContent = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [filters, setFilters] = useState({
    category: '',
    shape: '',
    metal: '',
    priceRange: ''
  })
  const [sortBy, setSortBy] = useState('relevance')
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId)
  }

  useEffect(() => {
    let filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.shape.toLowerCase().includes(query.toLowerCase()) ||
      product.metal.toLowerCase().includes(query.toLowerCase())
    )

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }
    if (filters.shape) {
      filtered = filtered.filter(product => product.shape === filters.shape)
    }
    if (filters.metal) {
      filtered = filtered.filter(product => product.metal === filters.metal)
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(product => product.price >= min && product.price <= max)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // relevance - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [query, filters, sortBy])

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }))
    dispatch(addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`
    }))
  }

  const handleAddToWishlist = (product: typeof mockProducts[0]) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id))
      dispatch(addToast({
        type: 'success',
        title: 'Removed from Wishlist',
        message: `${product.name} has been removed from your wishlist.`
      }))
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }))
      dispatch(addToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: `${product.name} has been added to your wishlist.`
      }))
    }
    
    // Open the wishlist drawer to show the updated wishlist
    dispatch(openWishlistDrawer())
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Results Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Category</h4>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                <option value="Rings">Rings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Earrings">Earrings</option>
              </select>
            </div>

            {/* Shape Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Shape</h4>
              <select
                value={filters.shape}
                onChange={(e) => setFilters({ ...filters, shape: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Shapes</option>
                <option value="Round">Round</option>
                <option value="Princess">Princess</option>
                <option value="Heart">Heart</option>
                <option value="Oval">Oval</option>
              </select>
            </div>

            {/* Metal Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Metal</h4>
              <select
                value={filters.metal}
                onChange={(e) => setFilters({ ...filters, metal: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Metals</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Prices</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000+</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({ category: '', shape: '', metal: '', priceRange: '' })}
              className="w-full text-pink-600 hover:text-pink-700 text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">
              Showing {filteredProducts.length} results
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg 
                        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-pink-500'}`} 
                        fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Product Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.category} • {product.shape} • {product.metal}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-pink-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// Loading component for Suspense fallback
const SearchLoading = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </main>
)

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>

      <Footer />
    </div>
  )
}

export default SearchPage