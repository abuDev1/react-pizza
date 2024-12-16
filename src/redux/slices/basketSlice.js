import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },

    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count === 0) {
        findItem.count = 0;
      } else {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        if (obj.price * obj.count - sum <= 0) {
          return 0;
        } else {
          return obj.price * obj.count - sum;
        }
      }, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
      
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0
    },
  },
});

export const basketSelector = (state) => state.basket

export const { addItem, removeItem, clearItem, plusItem, minusItem } =
  basketSlice.actions;

export default basketSlice.reducer;
