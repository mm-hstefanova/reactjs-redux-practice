import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalCartItems: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.cartItems = action.payload.cartItems;
      state.totalPrice = action.payload.totalPrice;
      state.totalCartItems = action.payload.totalCartItems;
    },
    addItem(state, action) {
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.quantity;

      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.cartItems.push(action.payload);
      } else {
        existingItem.quantity++;
      }

      state.changed = true;
      state.totalCartItems = state.cartItems.reduce(
        (quantity, currentItem) => quantity + currentItem.quantity,
        0
      );
    },
    removeItem(state, action) {
      state.totalCartItems--;

      const existingCartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      } else {
        existingCartItem.quantity--;
        existingCartItem.totalPrice =
          existingCartItem.totalPrice - existingCartItem.price;
      }

      state.changed = true;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
