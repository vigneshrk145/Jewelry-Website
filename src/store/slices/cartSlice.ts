import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

interface CartState {
  items: CartItem[]
  total: number
  isHydrated: boolean
}

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('cart')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
      return []
    }
  }
  return []
}

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }
}

// Calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

const initialState: CartState = {
  items: [],
  total: 0,
  isHydrated: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrate: (state) => {
      if (!state.isHydrated) {
        state.items = loadCartFromStorage()
        state.total = calculateTotal(state.items)
        state.isHydrated = true
      }
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      saveCartToStorage(state.items)
    },
  },
})

export const { hydrate, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer