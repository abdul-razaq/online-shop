import { combineReducers } from "redux";

import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";
import ordersReducer from "./reducers/orders";
import authReducer from "./reducers/auth";

export default combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
	auth: authReducer,
});
