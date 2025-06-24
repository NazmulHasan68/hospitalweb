import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // Optional: remove item when quantity is 0
        state.cartItems = state.cartItems.filter((i) => i._id !== id);
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
