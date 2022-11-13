import { configureStore } from '@reduxjs/toolkit'

import filter from './slices/filterSlice.js'
import cart from './slices/cartSlice.js'
import pizzas from './slices/pizzasSlice.js'

export const store = configureStore({
  reducer: {
    filter, 
    cart,
    pizzas,
  },
})