import PRODUCTS from "../../data/dummy-data";

const initialState = {
	availableProducts: PRODUCTS,
	// userProducts contain Product objects that are created by the currently authenticated/logged in user. So the productOwnerId will be the ID of the currently logged in user.
	userProducts: PRODUCTS.filter(product => product.productOwnerId === "u1"),
};

export default function productsReducer(state = initialState, action) {
	return state;
}
