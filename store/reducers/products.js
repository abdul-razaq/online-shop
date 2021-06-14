import { actionTypes } from "../actions/products";

import Product from "../../models/product";

const initialState = {
	availableProducts: [],
	userProducts: [],
};

export default function productsReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actionTypes.RETRIEVE_PRODUCTS:
			return {
				availableProducts: payload.products,
				userProducts: payload.userProducts,
			};
		case actionTypes.ADD_PRODUCT:
			const { productDetails: newProduct } = payload;
			const product = new Product(
				newProduct.productId,
				newProduct.productOwnerId,
				newProduct.title,
				newProduct.imageURL,
				newProduct.description,
				+newProduct.price
			);
			return {
				...state,
				availableProducts: [...state.availableProducts, product],
				userProducts: [...state.userProducts, product],
			};
		case actionTypes.UPDATE_PRODUCT:
			const { productId, productDetails } = payload;
			const { title, imageURL, description } = productDetails;

			const productToUpdateIndex = state.userProducts.findIndex(
				product => product.productId === productId
			);
			const existingUserProducts = [...state.userProducts];
			existingUserProducts[productToUpdateIndex].productTitle = title;
			existingUserProducts[productToUpdateIndex].productImageURL = imageURL;
			existingUserProducts[productToUpdateIndex].productDescription =
				description;

			const availableProductIndex = state.availableProducts.findIndex(
				product => product.productId === productId
			);
			const availableProducts = [...state.availableProducts];
			availableProducts[availableProductIndex].productTitle = title;
			availableProducts[availableProductIndex].productImageURL = imageURL;
			availableProducts[availableProductIndex].productDescription = description;

			return {
				...state,
				availableProducts,
				userProducts: existingUserProducts,
			};

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
