import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import PrimaryText from "../commons/PrimaryText";
import TitleText from "../commons/TitleText";

import Colors from "../../constants/Colors";
import { cardStyle } from "../../constants/Styles";

export default function OrderItem(props) {
	// receive showDetails props to determine whether to show Order details (cart Item) or not.
	return (
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
				title="Toggle Details"
				color={Colors.primaryColor}
				onPress={props.onShowDetails}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	orderItem: {
		...cardStyle,
		margin: 20,
		padding: 10,
		alignItems: "center",
	},

	summary: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
    marginBottom: 10,
	},
});
