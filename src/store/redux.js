import { createSlice, configureStore } from "@reduxjs/toolkit";

const initalCartState = {
  itemAlreadyInCart: false,
  hasItem: false,
  showCart: false,
  addProduct: [],
  totalProduct: 0,
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
      state.totalProduct++;
    },
    increaseItem(state, action) {
      state.addProduct[action.payload].amount++;
      state.totalProduct++;
    },
    decreaseItem(state) {
      state.addProduct.amount--;
      state.totalProduct++;
    },
    setItemAlreadyinCart(state) {
      state.itemAlreadyInCart = true;
    },
    setItemNotinCart(state) {
      state.itemAlreadyInCart = false;
    },
  },
});

const store = configureStore({
  reducer: addTocart.reducer,
});

export const cartActions = addTocart.actions;

export default store;
