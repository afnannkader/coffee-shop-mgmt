// src/reducers/productReducer.js

import {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET
} from '../constants/ProductConstants';

const initialState = {
  product: {},
  loading: false,
  success: false,
  error: null,
};

export const newProductReducer = (state = initialState, action) => {
  switch (action.type) {
      case NEW_PRODUCT_REQUEST:
          return { ...state, loading: true };
      case NEW_PRODUCT_SUCCESS:
          return { loading: false, success: true, product: action.payload };
      case NEW_PRODUCT_FAIL:
          return { loading: false, error: action.payload };
      case NEW_PRODUCT_RESET:
          return initialState;
      default:
          return state;
  }
};

export const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_PRODUCT_REQUEST:
          return { ...state, loading: true };
      case UPDATE_PRODUCT_SUCCESS:
          return { loading: false, success: true, product: action.payload };
      case UPDATE_PRODUCT_FAIL:
          return { loading: false, error: action.payload };
      case UPDATE_PRODUCT_RESET:
          return initialState;
      default:
          return state;
  }
};

export const deleteProductReducer = (state = initialState, action) => {
  switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
          return { ...state, loading: true };
      case DELETE_PRODUCT_SUCCESS:
          return { loading: false, success: true, product: action.payload };
      case DELETE_PRODUCT_FAIL:
          return { loading: false, error: action.payload };
      case DELETE_PRODUCT_RESET:
          return initialState;
      default:
          return state;
  }
};
