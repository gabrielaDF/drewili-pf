import {
  getProductsSuccess,
  getProductsByIdslice,
  postProductsSuccess,
  searchProductSuccess,
} from "./productSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/product";
const SEARCH_API_URL = "http://localhost:3001/product/product/";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const products = response.data;

      dispatch(getProductsSuccess({ products }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);

      const productsId = response.data;

      dispatch(getProductsByIdslice({ productsId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};

export const postProducts = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, productData);
      const products = response.data;
      console.log(products);

      dispatch(postProductsSuccess({ products }));
    } catch (error) {
      console.error("Error create products:", error);
    }
  };
};
export const searchProduct = (keyword) => {
  return async (dispatch) => {
    try {

      const response = await axios.get(`${SEARCH_API_URL}?keyWord=${keyword}`);

      const products = response.data;

      dispatch(searchProductSuccess({ products }));
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
};