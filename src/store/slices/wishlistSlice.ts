import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistState {
  items: WishlistItem[]
  isHydrated: boolean
}

// Load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('wishlist')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error)
      return []
    }
  }
  return []
}

// Save wishlist to localStorage
const saveWishlistToStorage = (items: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error)
    }
  }
}

const initialState: WishlistState = {
  items: [],
  isHydrated: false,
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    hydrate: (state) => {
      if (!state.isHydrated) {
        state.items = loadWishlistFromStorage()
        state.isHydrated = true
      }
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push(action.payload)
        saveWishlistToStorage(state.items)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveWishlistToStorage(state.items)
    },
    clearWishlist: (state) => {
      state.items = []
      saveWishlistToStorage(state.items)
    },
  },
})

export const { hydrate, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer