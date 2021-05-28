import React from "react";
import { View, Text, StyleSheet } from "react-native";

import TitleText from "../../components/widgets/TitleText";

export default function EditProductScreen(props) {
	return (
		<View style={styles.screen}>
			<TitleText>This is the Screen to edit or add a new product!</TitleText>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
