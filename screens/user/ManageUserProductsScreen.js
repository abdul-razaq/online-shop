import React from "react";
import { View, Text, StyleSheet } from "react-native";

import TitleText from "../../components/commons/TitleText";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

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

ManageUserProductsScreen.navigationOptions = ({ navigation }) => {
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
		justifyContent: "center",
		alignItems: "center",
	},
});
