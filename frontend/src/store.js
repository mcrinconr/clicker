import {
  createStore,
  compose,
  applyMiddleware, combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer, } from './reducers/productReducers';
import {
  userDeleteReducer,
  userRegisterReducer,
  userSigninReducer,
  userDetailsReducer,
  userListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userAddressMapReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
   } from './reducers/orderReducers';
import {
  highlightCreateReducer,
  highlightListReducer,
  highlightUpdateReducer,
  highlightDeleteReducer,
  highlightDetailsReducer,
} from './reducers/highlightReducers';
import {
  insightCreateReducer,
  insightListReducer,
  insightUpdateReducer,
  insightDeleteReducer,
  insightDetailsReducer,
} from './reducers/insightReducers';
import {
  footerListReducer,
  footerUpdateReducer,
  footerDetailsReducer,
  footerDeleteReducer,
} from './reducers/footerReducers';
import {
  navbarListReducer,
  navbarUpdateReducer,
  navbarDetailsReducer,
  navbarDeleteReducer,
} from './reducers/navbarReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
      paymentMethod: 'PayPal'
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  highlightList: highlightListReducer,
  highlightCreate: highlightCreateReducer,
  highlightUpdate: highlightUpdateReducer,
  highlightDelete: highlightDeleteReducer,
  highlightDetails: highlightDetailsReducer,
  insightList: insightListReducer,
  insightCreate: insightCreateReducer,
  insightUpdate: insightUpdateReducer,
  insightDelete: insightDeleteReducer,
  insightDetails: insightDetailsReducer,
  footerList: footerListReducer,
  footerUpdate: footerUpdateReducer,
  footerDelete: footerDeleteReducer,
  footerDetails: footerDetailsReducer,
  navbarList: navbarListReducer,
  navbarUpdate: navbarUpdateReducer,
  navbarDetails: navbarDetailsReducer,
  navbarDelete: navbarDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
