import React from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Colors";

function renderProductItems(productItem, navigation) {
	function onEditProduct() {
		console.log('got here!')
		navigation.navigate({
			routeName: "EditUserProduct",
			params: {
				productId: productItem.productId,
			},
		});
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
					<Button
						color="red"
						title="Delete"
						onPress={() => {"DISPATCH DELETE THIS PRODUCT TO REDUX!!!"}}
					/>
				</View>
			</View>
		</ProductItem>
	);
}

export default function ManageUserProductsScreen(props) {
	const userProducts = useSelector(state => state.products.userProducts);
	return (
		<View style={styles.screen}>
			<FlatList
				data={userProducts}
				keyExtractor={product => product.productId}
				renderItem={({ item }) => renderProductItems(item, props.navigation)}
			/>
		</View>
	);
}

ManageUserProductsScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: "Manage Your Products",
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
