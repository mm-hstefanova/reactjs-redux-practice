import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalCartItems: 0,
    showCart: false,
  },
  reducers: {
    addItem(state, action) {
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.quantity;

      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.cartItems[existingCartItemIndex];

      if (existingCartItem) {
        state.cartItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }

      state.totalCartItems = state.cartItems.reduce(
        (quantity, currentItem) => quantity + currentItem.quantity,
        0
      );
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      const existingCartItem = state.cartItems[existingCartItemIndex];

      if (existingCartItem.quantity > 1) {
        state.cartItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
