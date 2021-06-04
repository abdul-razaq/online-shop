import PRODUCTS from "../../data/dummy-data";

import { actionTypes } from "../actions/products";

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter(product => product.productOwnerId === "u1"),
};

export default function productsReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actionTypes.ADD_NEW_PRODUCT:
			const { productDetails: newProduct } = payload;
			return state;
		case actionTypes.UPDATE_PRODUCT:
			return state;
		case actionTypes.DELETE_PRODUCT:
			const filteredProducts = state.availableProducts.filter(
				product => product.productId !== payload.productId
			);
			const filteredUserProducts = state.userProducts.filter(
				product => product.productId !== payload.productId
			);
			return {
				...state,
				availableProducts: filteredProducts,
				userProducts: filteredUserProducts,
			};
		default:
			return state;
	}
}
