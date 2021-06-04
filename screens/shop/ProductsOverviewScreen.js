import React from "react";
import {
	FlatList,
	View,
	Button,
	StyleSheet,
	Platform,
	Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

import cartActions from "../../store/actions/cart";

function renderProducts(productData, navigation, dispatchFunction) {
	const { item: product } = productData;

	function onViewDetails() {
		navigation.navigate({
			routeName: "ProductDetails",
			params: {
				productId: product.productId,
				productTitle: product.productTitle,
			},
		});
	}

	return (
		<ProductItem product={product} onSelect={onViewDetails}>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button
						color={Colors.primaryColor}
						title="View Details"
						onPress={onViewDetails}
					/>
				</View>
				<View style={styles.button}>
					<Button
						color={Colors.primaryColor}
						title="To Cart"
						onPress={() => {
							dispatchFunction(cartActions.addToCart(product));
							Alert.alert(
								"Item added to cart!",
								`${product.productTitle} added to cart!`
							);
						}}
					/>
				</View>
			</View>
		</ProductItem>
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

	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},

	button: {
		width: 120,
	},
});
