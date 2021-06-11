import Product from "../../models/product";

export const actionTypes = {
	ADD_PRODUCT: "ADD_NEW_PRODUCT",
	DELETE_PRODUCT: "DELETE_PRODUCT",
	UPDATE_PRODUCT: "UPDATE_PRODUCT",
	RETRIEVE_PRODUCTS: "RETRIEVE_PRODUCTS",
};

function retrieveProducts() {
	return async function (dispatch) {
		try {
			const response = await fetch(
				"https://online-shop-59f2d-default-rtdb.firebaseio.com/products.json"
			);
			if (!response.ok) throw new Error("An error occurred.");
			const resData = await response.json();
			const loadedProducts = [];
			for (productId in resData) {
				loadedProducts.push(
					new Product(
						productId,
						"u1",
						resData[productId].title,
						resData[productId].imageURL,
						resData[productId].description,
						resData[productId].price
					)
				);
			}
			dispatch({
				type: actionTypes.RETRIEVE_PRODUCTS,
				payload: { products: loadedProducts },
			});
		} catch (error) {
			throw error;
		}
	};
}

function addProduct(productDetails) {
	return async function (dispatch) {
		try {
			const response = await fetch(
				"https://online-shop-59f2d-default-rtdb.firebaseio.com/products.json",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(productDetails),
				}
			);
			if (!response.ok) throw new Error("unable to add product.");

			const responseData = await response.json();
			productDetails.productId = responseData.name;
			dispatch({
				type: actionTypes.ADD_PRODUCT,
				payload: { productDetails },
			});
		} catch (error) {
			throw error;
		}
	};
}

function updateProduct(productId, productDetails) {
	return async function (dispatch) {
		try {
			productDetails.price = undefined;
			const response = await fetch(
				`https://online-shop-59f2d-default-rtdb.firebaseio.com/products/${productId}.json`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(productDetails),
				}
			);
			if (!response.ok) throw new Error("unable to update product.");
			dispatch({
				type: actionTypes.UPDATE_PRODUCT,
				payload: { productId, productDetails },
			});
		} catch (error) {
			throw error;
		}
	};
}

function deleteProduct(productId) {
	return async function (dispatch) {
		try {
			const response = await fetch(
				`https://online-shop-59f2d-default-rtdb.firebaseio.com/products/${productId}.json`,
				{ method: "DELETE" }
			);
			if (!response.ok) throw new Error("unable to delete product.");
			dispatch({
				type: actionTypes.DELETE_PRODUCT,
				payload: { productId },
			});
		} catch (error) {
			throw error;
		}
	};
}

export default {
	retrieveProducts,
	addProduct,
	updateProduct,
	deleteProduct,
};
