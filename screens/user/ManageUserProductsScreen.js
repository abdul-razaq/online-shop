import React from "react";
import {
	View,
	FlatList,
	Button,
	Platform,
	StyleSheet,
	Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Colors";
import productActions from "../../store/actions/products";
import PrimaryText from "../../components/commons/PrimaryText";
import Center from "../../components/commons/Center";

function renderProductItems(productItem, navigation, dispatchFunction) {
	function onEditProduct() {
		navigation.navigate({
			routeName: "EditScreen",
			params: {
				productId: productItem.productId,
				productTitle: productItem.productTitle,
			},
		});
	}

	function onDeleteProduct() {
		Alert.alert(
			"Delete confirmation",
			"Are you sure you want to delete product?",
			[
				{
					text: "Delete",
					style: "destructive",
					onPress: () =>
						dispatchFunction(
							productActions.deleteProduct(productItem.productId)
						),
				},
				{ text: "Cancel", style: "cancel" },
			]
		);
	}

	return (
		<ProductItem product={productItem} onSelect={onEditProduct}>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button
						color={Colors.primaryColor}
						title="Edit Product"
						onPress={onEditProduct}
					/>
				</View>
				<View style={styles.button}>
					<Button color="red" title="Delete" onPress={onDeleteProduct} />
				</View>
			</View>
		</ProductItem>
	);
}

export default function ManageUserProductsScreen(props) {
	const dispatchFunction = useDispatch();

	const userProducts = useSelector(state => state.products.userProducts);

	if (!userProducts.length) {
		return (
			<Center>
				<PrimaryText>
					You do not have any product yet, consider adding some products.
				</PrimaryText>
			</Center>
		);
	}

	return (
		<View style={styles.screen}>
			<FlatList
				data={userProducts}
				keyExtractor={product => product.productId}
				renderItem={({ item }) =>
					renderProductItems(item, props.navigation, dispatchFunction)
				}
			/>
		</View>
	);
}

ManageUserProductsScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: "Manage Your Products",
		headerLeft: () => (
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
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Add Product"
					iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
					onPress={() => {
						navigation.navigate({ routeName: "EditScreen" });
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
