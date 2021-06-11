import { actionTypes } from "../actions/orders";

import Order from "../../models/orders";

const initialState = {
	orders: [],
};

export default function ordersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.ADD_ORDER:
			const { orderId, cartItems, totalAmount, date } = payload;
			const newOrder = new Order(orderId, cartItems, totalAmount, date);
			return {
				...state,
				orders: state.orders.concat(newOrder),
			};
		default:
			return state;
	}
}
