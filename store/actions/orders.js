import Order from "../../models/orders";

export const actionTypes = {
	ADD_ORDER: "ADD_ORDER",
	FETCH_ORDERS: "FETCH_ORDERS",
};

function fetchOrders() {
	return async function (dispatch, getState) {
		const userId = getState().auth.userId;
		try {
			const response = await fetch(
				`https://online-shop-59f2d-default-rtdb.firebaseio.com/orders/${userId}.json`
			);
			if (!response.ok)
				throw new Error("an error occurred while fetching orders.");

			const resData = await response.json();
			const loadedOrders = [];

			for (orderId in resData) {
				loadedOrders.push(
					new Order(
						orderId,
						resData[orderId].cartItems,
						resData[orderId].totalAmount,
						new Date(resData[orderId].date)
					)
				);
			}

			dispatch({
				type: actionTypes.FETCH_ORDERS,
				payload: {
					orders: loadedOrders,
				},
			});
		} catch (error) {
			throw error;
		}
	};
}

function addOrder(cartItems, totalAmount) {
	return async function (dispatch, getState) {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		try {
			const date = new Date();
			const response = await fetch(
				`https://online-shop-59f2d-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
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

export default {
	addOrder,
	fetchOrders,
};
