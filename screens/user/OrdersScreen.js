import React from "react";
import { View, StyleSheet } from "react-native";

import TitleText from "../../components/widgets/TitleText";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

export default function OrdersScreen(props) {
	return (
		<View style={styles.screen}>
			<TitleText>This is the User's Orders Screen!</TitleText>
		</View>
	);
}

OrdersScreen.navigationOptions = ({ navigation }) => {
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
