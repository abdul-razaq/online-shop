import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

function renderProducts(productData) {
	return (
		<View>
			<Text>{productData.item.productTitle}</Text>
		</View>
	);
}
export default function ProductsOverviewScreen(props) {
	const products = useSelector(state => state.products.availableProducts);

	return (
		<View>
			<Text>Products Overview Screen!</Text>
			<FlatList
				data={products}
				keyExtractor={product => product.productId}
				renderItem={productData => renderProducts(productData)}
			/>
		</View>
	);
}

ProductsOverviewScreen.navigationOptions = {
	headerTitle: "All Products",
};

const styles = StyleSheet.create({});
