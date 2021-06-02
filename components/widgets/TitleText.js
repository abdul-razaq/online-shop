import React from "react";
import { Text, StyleSheet } from "react-native";

export default function TitleText(props) {
	return (
		<Text {...props} style={{ ...styles.title, ...props.style }}>
			{props.children}
		</Text>
	);
}

const styles = StyleSheet.create({
	title: {
		fontFamily: "koho-bold",
		fontSize: 22,
	},
});
