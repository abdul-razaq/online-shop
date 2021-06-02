import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import TitleText from "../widgets/TitleText";
import PrimaryText from "../widgets/PrimaryText";

import cartActions from "../../store/actions/cart";

import Colors from "../../constants/Colors";

export default function CartItem({ cart }) {
	const dispatchFunction = useDispatch();
	const TouchableWrapper =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;

	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<TouchableWrapper
					onPress={() => dispatchFunction(cartActions.addToCart(cart))}
				>
					<Ionicons
						name="caret-up"
						size={23}
						color={Colors.primaryColor}
						style={styles.addToCartButton}
					/>
				</TouchableWrapper>
				<PrimaryText style={styles.quantityText}>{cart.quantity}</PrimaryText>
				<TitleText style={styles.productTitle}>{cart.productTitle}</TitleText>
			</View>
			<View style={styles.itemData}>
				<TitleText>${cart.totalSum.toFixed(2)}</TitleText>
				<TouchableWrapper
					onPress={() =>
						dispatchFunction(cartActions.removeProductFromCart(cart.productId))
					}
				>
					<Ionicons
						name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
						size={23}
						color="red"
						style={styles.trashButton}
					/>
				</TouchableWrapper>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cartItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	itemData: {
		flexDirection: "row",
		alignItems: "center",
    justifyContent: "space-between",
		width: "70%",
	},
	quantityText: {
		color: "#888",
		fontSize: 16,
		marginRight: 10,
	},
	productTitle: {
		fontSize: 20,
	},
	trashButton: {
		marginLeft: 10,
	},
  addToCartButton: {},
});
