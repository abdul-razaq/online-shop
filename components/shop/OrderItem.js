import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import PrimaryText from "../commons/PrimaryText";
import TitleText from "../commons/TitleText";
import CartItem from "./CartItem";

import Colors from "../../constants/Colors";
import { cardStyle } from "../../constants/Styles";

export default function OrderItem(props) {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<View style={styles.ordersContainer}>
			<View style={styles.orderItem}>
				<View style={styles.summary}>
					<TitleText style={{ fontSize: 16 }}>
						${props.total.toFixed(2)}
					</TitleText>
					<PrimaryText style={{ color: "#888", fontSize: 16 }}>
						{props.date}
					</PrimaryText>
				</View>
				<Button
					title={showDetails ? "Hide Details" : "Show Details"}
					color={Colors.primaryColor}
					onPress={() => setShowDetails(prevValue => !prevValue)}
				/>
			</View>
			{showDetails && (
				<View style={styles.cartItemsContainer}>
					{props.cartItems.map(cartItem => (
						<CartItem key={cartItem.productId} cart={cartItem} inOrderItem />
					))}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	ordersContainer: {
		padding: 20,
	},
	orderItem: {
		...cardStyle,
		padding: 10,
		alignItems: "center",
	},

	summary: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	cartItemsContainer: {
		...cardStyle,
		marginTop: 20,
		padding: 10,
	},
});
