export default class Product {
	constructor(
		productId,
		productOwnerId,
		productTitle,
		productImageURL,
		productDescription,
    productPrice,
	) {
		this.productId = productId;
		this.productOwnerId = productOwnerId;
		this.productTitle = productTitle;
		this.productImageURL = productImageURL;
		this.productDescription = productDescription;
    this.productPrice = productPrice;
	}
}
