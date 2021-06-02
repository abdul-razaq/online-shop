export const actionTypes = {
	ADD_TO_CART: "ADD_TO_CART",
	REMOVE_FROM_CART: "REMOVE_FROM_CART",
	CLEAR_CART: "CLEAR_CART",
};

function addToCart(product) {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: {
			product,
		},
	};
}

function removeProductFromCart(productId) {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		payload: { productId },
	};
}

function clearCart() {
	return { type: actionTypes.CLEAR_CART };
}

export default {
	addToCart,
	removeProductFromCart,
	clearCart,
};
