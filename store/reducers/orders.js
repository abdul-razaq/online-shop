import { actionTypes } from "../actions/orders";

import Order from "../../models/orders";

const initialState = {
	orders: [],
};

export default function ordersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.ADD_ORDER:
			const { cartItems, totalAmount } = payload;
			const newOrder = new Order(
				new Date().toString(),
				cartItems,
				totalAmount,
				new Date()
			);
			return {
				...state,
				orders: state.orders.concat(newOrder),
			};
		default:
			return state;
	}
}
