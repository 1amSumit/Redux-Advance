import { createSlice, configureStore } from "@reduxjs/toolkit";

const initalCartState = {
  itemAlreadyInCart: false,
  hasItem: false,
  showCart: false,
  addProduct: [],
};

const addTocart = createSlice({
  name: "addTocart",
  initialState: initalCartState,
  reducers: {
    showCartModel(state) {
      state.showCart = !state.showCart;
    },
    addProductToCart(state, action) {
      state.addProduct.push(action.payload);
    },
    addToCart(state) {
      state.product++;
      state.hasItem = true;
    },
    increaseItem(state) {
      state.addProduct.amount++;
    },
    decreaseItem(state) {
      state.addProduct.amount--;
    },
    setItemAlreadyinCart(state) {
      state.itemAlreadyInCart = true;
    },
  },
});

const store = configureStore({
  reducer: addTocart.reducer,
});

export const cartActions = addTocart.actions;

export default store;
