'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

const SearchBar = ({ placeholder = "Search for jewelry...", className = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  // Mock suggestions - in real app, this would come from API
  const mockSuggestions = [
    'Diamond Rings', 'Gold Necklace', 'Pearl Earrings', 'Silver Bracelet',
    'Engagement Ring', 'Wedding Band', 'Tennis Bracelet', 'Statement Necklace',
    'Stud Earrings', 'Chain Bracelet', 'Pendant Necklace', 'Hoop Earrings'
  ]

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = mockSuggestions.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
      setSearchQuery('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
        <button
          onClick={() => handleSearch()}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            >
              <span className="text-gray-700">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar