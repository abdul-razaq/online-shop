import React from "react";
import { FlatList, View, StyleSheet, Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";

import cartActions from "../../store/actions/cart";

function renderProducts(productData, navigation, dispatchFunction) {
	const { item: product } = productData;
	return (
		<ProductItem
			product={product}
			onViewDetails={() =>
				navigation.navigate({
					routeName: "ProductDetails",
					params: {
						productId: product.productId,
						productTitle: product.productTitle,
					},
				})
			}
			onAddToCart={() => {
				dispatchFunction(cartActions.addToCart(product));
				Alert.alert(
					"Item added to cart!",
					`${product.productTitle} added to cart!`
				);
			}}
		/>
	);
}

export default function ProductsOverviewScreen(props) {
	const products = useSelector(state => state.products.availableProducts);

	const dispatchFunction = useDispatch();

	return (
		<View style={styles.screen}>
			<FlatList
				data={products}
				keyExtractor={product => product.productId}
				renderItem={productData =>
					renderProducts(productData, props.navigation, dispatchFunction)
				}
			/>
		</View>
	);
}

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: "All Products",
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="menu"
					onPress={() => {
						navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Cart"
					iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
					onPress={() => {
						navigation.navigate({ routeName: "Cart" });
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
