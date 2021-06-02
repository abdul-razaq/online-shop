export default class CartItem {
	constructor(productId, quantity, productPrice, productTitle, totalSum) {
		this.productId = productId;
		this.quantity = quantity;
		this.productPrice = productPrice;
		this.productTitle = productTitle;
		this.totalSum = totalSum;
	}
}
