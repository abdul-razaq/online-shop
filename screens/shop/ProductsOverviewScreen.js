import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

function renderProducts(productData, navigation) {
	return (
		<ProductItem
			product={productData.item}
			onViewDetails={() =>
				navigation.navigate({
					routeName: "ProductDetails",
					params: {
						productId: productData.item.productId,
						productTitle: productData.item.productTitle,
					},
				})
			}
			onAddToCart={() => {}}
		/>
	);
}

export default function ProductsOverviewScreen(props) {
	const products = useSelector(state => state.products.availableProducts);

	return (
		<View style={styles.screen}>
			<FlatList
				data={products}
				keyExtractor={product => product.productId}
				renderItem={productData =>
					renderProducts(productData, props.navigation)
				}
			/>
		</View>
	);
}

ProductsOverviewScreen.navigationOptions = {
	headerTitle: "All Products",
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
