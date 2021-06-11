import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Button,
	FlatList,
	Alert,
	ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import TitleText from "../../components/commons/TitleText";
import HeaderButton from "../../components/UI/HeaderButton";
import CartItem from "../../components/shop/CartItem";

import ordersActions from "../../store/actions/orders";
import cartAction from "../../store/actions/cart";

import Colors from "../../constants/Colors";
import { cardStyle } from "../../constants/Styles";

export default function CartScreen(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const cartItems = useSelector(state => state.cart.cartItems);
	const cartTotalAmount = useSelector(state => state.cart.totalAmount);

	const dispatchFunction = useDispatch();

	async function sendOrderHandler() {
		try {
			setIsLoading(true);
			await dispatchFunction(
				ordersActions.addOrder(cartItems, cartTotalAmount)
			);
			dispatchFunction(cartAction.clearCart());
			setIsLoading(false);
			Alert.alert(
				"Order successfully placed!",
				"Successfully ordered your cart items."
			);
		} catch (error) {
			setError(error.message);
		}
	}

	if (error) {
		return Alert.alert("An error occurred.", error, [{ text: "Okay" }]);
	}

	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<TitleText style={styles.summaryText}>
					Total:{" "}
					<TitleText style={styles.amountText}>
						${cartTotalAmount.toFixed(2)}
					</TitleText>
				</TitleText>
				{isLoading ? (
					<ActivityIndicator size="small" color={Colors.primaryColor} />
				) : (
					<Button
						title="Order Now"
						color={Colors.primaryColor}
						disabled={!cart.length}
						onPress={sendOrderHandler}
					/>
				)}
			</View>
			<FlatList
				data={cart}
				keyExtractor={cart => cart.productId}
				renderItem={({ item }) => <CartItem cart={item} />}
			/>
		</View>
	);
}

CartScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: "Your Cart",
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
		padding: 20,
	},
	summary: {
		...cardStyle,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		marginBottom: 20,
	},
	summaryText: {
		fontSize: 22,
	},
	amountText: {
		fontSize: 22,
		color: Colors.primaryColor,
	},
});
