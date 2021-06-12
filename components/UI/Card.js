import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card({ children, style }) {
	return <View style={{ ...styles.card, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.26,
		shadowRadius: 10,
		shadowOffset: { height: 2, width: 0 },
		elevation: 8,
		backgroundColor: "#fff",
	},
});
