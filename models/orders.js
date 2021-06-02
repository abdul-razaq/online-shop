export default class Order {
  constructor(orderId, cartItems, totalAmount, date) {
    this.orderId = orderId;
    this.cartItems = cartItems;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}
