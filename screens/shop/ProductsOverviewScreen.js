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
				keyExtractor={product => product.productId}
				data={products}
				renderItem={productData => renderProducts(productData)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
