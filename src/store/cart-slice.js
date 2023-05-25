import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalProduct: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalProduct = action.payload.totalProduct;
      state.items = action.payload.items;
    },
    addProductToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          amount: 1,
          totalPrice: newItem.price,
        });
        state.totalProduct++;
        state.changed = true;
      } else {
        existingItem.amount++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.totalProduct++;
      }
    },
    remoeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true;
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalProduct--;
      } else {
        existingItem.amount--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.totalProduct--;
      }
    },
  },
});

export const getData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://orders-f0024-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartSlice.actions.replaceCart({
          items: cartData.items || [],
          totalProduct: cartData.totalProduct,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          message: error.message,
          title: "Got some error",
        })
      );
    }
  };
};

export const sendDataToCArt = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        message: "Sending...",
        title: "Sending data to cart!",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://orders-f0024-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };

    try {
      await sendData();
      dispatch(
        uiActions.setNotification({
          status: "seccess",
          message: "Order add to cart successfully",
          title: "Placed in Cart successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          message: error.message,
          title: "Got some error",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
