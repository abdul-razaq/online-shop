export const actionTypes = {
	ADD_PRODUCT: "ADD_NEW_PRODUCT",
	DELETE_PRODUCT: "DELETE_PRODUCT",
	UPDATE_PRODUCT: "UPDATE_PRODUCT",
};

function addProduct(productDetails) {
	return {
		type: actionTypes.ADD_PRODUCT,
		payload: { productDetails },
	};
}

function updateProduct(productId, productDetails) {
	return {
		type: actionTypes.UPDATE_PRODUCT,
		payload: { productId, productDetails },
	};
}

function deleteProduct(productId) {
	return {
		type: actionTypes.DELETE_PRODUCT,
		payload: { productId },
	};
}

export default {
	addProduct,
	updateProduct,
	deleteProduct,
};
