import React from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import TitleText from "../../components/widgets/TitleText";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import CartItem from "../../components/shop/cartItem";

import Colors from "../../constants/Colors";

export default function CartScreen(props) {
	const cart = useSelector(state => state.cart.cartItems);
	const cartTotalAmount = useSelector(state => state.cart.totalAmount);

	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<TitleText style={styles.summaryText}>
					Total:{" "}
					<TitleText style={styles.amountText}>${cartTotalAmount.toFixed(2)}</TitleText>
				</TitleText>
				<Button
					title="Order Now"
					color={Colors.primaryColor}
					disabled={!cart.length}
				/>
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		marginBottom: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.26,
		shadowRadius: 10,
		shadowOffset: { height: 2, width: 0 },
		elevation: 8,
		backgroundColor: "#fff",
	},
	summaryText: {
		fontSize: 22,
	},
	amountText: {
		fontSize: 22,
		color: Colors.primaryColor,
	},
});
