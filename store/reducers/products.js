import PRODUCTS from "../../data/dummy-data";

import { actionTypes } from "../actions/products";

import Product from "../../models/product";

const initialState = {
	errorMessage: "",
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
				userProducts: payload.products.filter(
					product => product.productOwnerId === "u1"
				),
			};
		case actionTypes.ADD_PRODUCT:
			const { productDetails: newProduct } = payload;
			const product = new Product(
				newProduct.productId,
				"u1",
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
		case actionTypes.NETWORK_ERROR:
			return {
				...state,
				errorMessage:
					"Couldn't fetch products, check your internet connection.",
			};
		default:
			return state;
	}
}
