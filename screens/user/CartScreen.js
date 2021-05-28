import React from "react";
import { View, StyleSheet } from "react-native";

import TitleText from "../../components/widgets/TitleText";

export default function CartScreen(props) {
	return (
		<View style={styles.screen}>
			<TitleText>This is the Cart Screen!</TitleText>
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
