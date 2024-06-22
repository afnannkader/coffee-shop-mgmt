import axios from 'axios';
import {
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/ProductConstants';


export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/products', productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(`/api/products/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const deleteProduct = (id, productData) => async (dispatch) => {
  try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };

      const { data } = await axios.delete(`/api/products/${id}`, productData, config);

      dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: DELETE_PRODUCT_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

