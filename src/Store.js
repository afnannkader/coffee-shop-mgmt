import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/UserReducer';
import { newProductReducer,updateProductReducer } from './reducers/ProductReducer';

const reducer = combineReducers({
    user: userReducer,
    newProduct: newProductReducer,
    updateProduct: updateProductReducer,
});

const middleware = [thunk];

const Store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
