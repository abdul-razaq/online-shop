import React from "react";
import { View, Text, StyleSheet } from "react-native";

import TitleText from "../../components/widgets/TitleText";

export default function ManageUserProductsScreen(props) {
	return (
		<View style={styles.screen}>
			<TitleText>
				This is the Screen that enables users to be able to manage their
				products. View them, edit them, delete them e.t.c!
			</TitleText>
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
