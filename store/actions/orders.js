export const actionTypes = {
	ADD_ORDER: "ADD_ORDER",
};

function addOrder(cartItems, totalAmount) {
	return {
		type: actionTypes.ADD_ORDER,
		payload: {
			cartItems,
			totalAmount,
		},
	};
}

export default {
	addOrder,
};
