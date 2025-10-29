import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isWishlistDrawerOpen: boolean
  isMobileMenuOpen: boolean
}

const initialState: UIState = {
  isWishlistDrawerOpen: false,
  isMobileMenuOpen: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleWishlistDrawer: (state) => {
      state.isWishlistDrawerOpen = !state.isWishlistDrawerOpen
    },
    openWishlistDrawer: (state) => {
      state.isWishlistDrawerOpen = true
    },
    closeWishlistDrawer: (state) => {
      state.isWishlistDrawerOpen = false
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    }
  }
})

export const { 
  toggleWishlistDrawer, 
  openWishlistDrawer, 
  closeWishlistDrawer,
  toggleMobileMenu,
  closeMobileMenu 
} = uiSlice.actions
export default uiSlice.reducer