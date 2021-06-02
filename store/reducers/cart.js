import cart, { actionTypes } from "../actions/cart";

import CartItem from "../../models/cart-item";

const initialState = {
	cartItems: [],
	totalAmount: 0,
};

export default function cartReducer(state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.ADD_TO_CART:
			const { product } = payload;
			const prevCartItems = [...state.cartItems];
			const cartItem = prevCartItems.find(
				cartItem => cartItem.productId === product.productId
			);
			if (cartItem) {
				cartItem.quantity = cartItem.quantity + 1;
				cartItem.totalSum = cartItem.productPrice * cartItem.quantity;
			} else {
				const newCartItem = new CartItem(
					product.productId,
					1,
					product.productPrice,
					product.productTitle,
					product.productPrice
				);
				prevCartItems.unshift(newCartItem);
			}
			const totalPrice = prevCartItems.reduce(
				(prevAmount, cartItem) => prevAmount + cartItem.totalSum,
				0
			);
			return {
				...state,
				cartItems: prevCartItems,
				totalAmount: totalPrice,
			};
		case actionTypes.REMOVE_FROM_CART:
			let oldCartItems = [...state.cartItems];
			const cartProduct = oldCartItems.find(
				item => item.productId === payload.productId
			);
			if (cartProduct.quantity > 1) {
				cartProduct.quantity = cartProduct.quantity - 1;
				cartProduct.totalSum = cartProduct.quantity * cartProduct.productPrice;
			} else {
				oldCartItems = oldCartItems.filter(
					item => item.productId !== cartProduct.productId
				);
			}
			const prevAmount = oldCartItems.reduce(
				(oldAmount, cartProduct) => oldAmount + cartProduct.totalSum,
				0
			);
			return {
				...state,
				cartItems: oldCartItems,
				totalAmount: prevAmount,
			};
		case actionTypes.CLEAR_CART:
			return {
				...state,
				cartItems: [],
				totalAmount: 0,
			};
		default:
			return state;
	}
}
