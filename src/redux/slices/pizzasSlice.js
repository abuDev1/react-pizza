import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const axiosPizzas = createAsyncThunk(
  "pizzas/axiosPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, curentPage } = params;
    const response = await axios.get(
      `https://6741e1e7e4647499008f1ddf.mockapi.io/items?&page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return response.data;
  }
);


const initialState = {
  items: [],
  status: "",
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosPizzas.pending, (state) => {
      state.status = "loading";
    })
      builder.addCase(axiosPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      builder.addCase(axiosPizzas.rejected, (state) => {
        state.status = "error";
      })
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
