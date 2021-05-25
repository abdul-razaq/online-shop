import { combineReducers } from "redux";

import productsReducer from "./reducers/product";

export default combineReducers({
	products: productsReducer,
});
