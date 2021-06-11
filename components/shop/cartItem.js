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

import TitleText from "../commons/TitleText";
import PrimaryText from "../commons/PrimaryText";

import cartActions from "../../store/actions/cart";

import Colors from "../../constants/Colors";

export default function CartItem({ cart, inOrderItem }) {
	const dispatchFunction = useDispatch();
	const TouchableWrapper =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;

	return (
		<View style={styles.cartItem}>
			<View style={{ ...styles.itemData, width: "45%" }}>
				{!inOrderItem && (
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
				)}
				<PrimaryText style={styles.quantityText}>{cart.quantity}</PrimaryText>
				<TitleText
					style={styles.productTitle}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{cart.productTitle}
				</TitleText>
			</View>
			<View style={styles.itemData}>
				<TitleText>${Number(cart.totalSum).toFixed(2)}</TitleText>
				{!inOrderItem && (
					<TouchableWrapper
						onPress={() =>
							dispatchFunction(
								cartActions.removeProductFromCart(cart.productId)
							)
						}
					>
						<Ionicons
							name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
							size={23}
							color="red"
							style={styles.trashButton}
						/>
					</TouchableWrapper>
				)}
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
		width: "100%",
	},
	itemData: {
		flexDirection: "row",
		alignItems: "center",
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
