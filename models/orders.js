import dayjs from "dayjs";

export default class Order {
	constructor(orderId, cartItems, totalAmount, date) {
		this.orderId = orderId;
		this.cartItems = cartItems;
		this.totalAmount = totalAmount;
		this.date = date;
	}

	get readableDate() {
		// return moment(this.date).format("MMMM Do YYYY, hh:mm");
		return dayjs(this.date).format("MMMM Do YYYY, hh:mm");
	}
}
