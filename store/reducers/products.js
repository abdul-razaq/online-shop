import PRODUCTS from "../../data/dummy-data";

import { actionTypes } from '../actions/products';

const initialState = {
	availableProducts: PRODUCTS,
	// userProducts contain Product objects that are created by the currently authenticated/logged in user. So the productOwnerId will be the ID of the currently logged in user.
	userProducts: PRODUCTS.filter(product => product.productOwnerId === "u1"),
};

export default function productsReducer(state = initialState, {type, payload}) {
	switch (type) {
		case actionTypes.ADD_NEW_PRODUCT:
			const { productDetails: newProduct} = payload;
			return state;
		case actionTypes.UPDATE_PRODUCT:
			const { productId } = payload;
			return state;
		case actionTypes.DELETE_PRODUCT:
			const { productId: productID } = payload;
			return state;
		default:
			return state;
	}
}
