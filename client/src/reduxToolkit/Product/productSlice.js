import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filterProducts:[],
  productsId: {},
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      state.filterProducts=action.payload.products;
    },
    getProductsByIdslice: (state, action) => {
      state.status = "succeeded";
      state.productsId = action.payload.productsId;
    },
    postProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      console.log("State after update:", state.products);
    },
    searchProductSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    filterPriceSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      state.error = null; 
    },
    filterColorSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
  },
});

export const {
  getProductsSuccess,
  postProductsSuccess,
  getProductsByIdslice,
  searchProductSuccess,
  filterPriceSuccess,
  filterColorSuccess
} = productSlice.actions;
export default productSlice.reducer;
