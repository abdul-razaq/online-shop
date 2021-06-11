export const actionTypes = {
	ADD_ORDER: "ADD_ORDER",
};

function addOrder(cartItems, totalAmount) {
	return async function (dispatch) {
		try {
			const date = new Date();
			const response = await fetch(
				"https://online-shop-59f2d-default-rtdb.firebaseio.com/orders/u1.json",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						cartItems,
						totalAmount,
						date: date.toISOString(),
					}),
				}
			);

			if (!response.ok) throw new Error("unable to add orders.");

			const resData = await response.json();

			dispatch({
				type: actionTypes.ADD_ORDER,
				payload: {
					orderId: resData.name,
					cartItems,
					totalAmount,
					date,
				},
			});
		} catch (error) {
			throw error;
		}
	};
}

function fetchOrders() {
	
}

export default {
	addOrder,
	fetchOrders,
};
