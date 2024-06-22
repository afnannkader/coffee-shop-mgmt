import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from '../constants/UserConstants'
import axios from 'axios';
const API_URL = 'http://localhost:5000'
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
      config.headers.Authorization = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const loginUser = (username, password) => async (dispatch) => {
  try {

      dispatch({ type: LOGIN_USER_REQUEST });

      const config = {
          headers: {
              "Content-Type": "application/json",
          },
      }

      const { data } = await apiClient.post('/api/login', { username, password }, config);
      const { token } = data;
      localStorage.setItem('authToken', token);
      // console.log(data)

      dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: data.user,
      });

  } catch (error) {
      dispatch({
          type: LOGIN_USER_FAIL,
          payload: error.response.data.message,
      });
  }
};




export const registerUser = (userData) => async (dispatch) => {
  try {

      dispatch({ type: REGISTER_USER_REQUEST });

      const config = {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      }

      const { data } = await axios.post(
          `${API_URL}/api/register`,
          userData,
          config
      );

      dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: data.user,
      });

  } catch (error) {
      dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message,
      });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
      dispatch({ type: LOAD_USER_REQUEST });

      const token = localStorage.getItem('authToken'); // Get the token
      console.log(token)

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };
      const { data } = await axios.get(`${API_URL}/api/me`, config);
    //   console.log(data)

      dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.user,
      });

  } catch (error) {
      dispatch({
          type: LOAD_USER_FAIL,
          payload: error.response.data.message,
      });
  }
};