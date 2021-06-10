import React, { useEffect, useCallback } from "react";
import {
	FlatList,
	View,
	Button,
	StyleSheet,
	Platform,
	Alert,
	ActivityIndicator,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import PrimaryText from "../../components/commons/PrimaryText";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

import cartActions from "../../store/actions/cart";
import productActions from "../../store/actions/products";

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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const products = useSelector(state => state.products.availableProducts);
	const errorMessage = useSelector(state => state.products.errorMessage);

	const dispatchFunction = useDispatch();

	const loadProducts = useCallback(async () => {
		setError("");
		setIsLoading(true);
		try {
			await dispatchFunction(productActions.retrieveProducts());
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, [setIsLoading, dispatchFunction, setError]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	useEffect(() => {
		const willFocusSub = props.navigation.addEventListener(
			"willFocus",
			loadProducts
		);
		return () => {
			willFocusSub.remove();
		};
	}, [loadProducts]);

	if (error) {
		<View style={styles.centered}>
			<PrimaryText>An error occurred, check internet connection.</PrimaryText>
			<Button
				title="Try again"
				color={Colors.primaryColor}
				onPress={loadProducts}
			/>
		</View>;
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primaryColor} />
			</View>
		);
	}

	if (!isLoading && !products.length) {
		return (
			<View style={styles.centered}>
				<PrimaryText>
					No products available, you can start by adding new products.
				</PrimaryText>
			</View>
		);
	}

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

	centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
