import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

function renderOrderItem(item, showDetails, setShowDetails) {
	return (
		<OrderItem
			total={item.totalAmount}
			date={item.date.toLocaleString()}
			onShowDetails={() => setShowDetails(prevValue => !prevValue)}
			showDetails={showDetails}
		/>
	);
}

export default function OrdersScreen(props) {
	const [showDetails, setShowDetails] = useState(false);
	const orders = useSelector(state => state.orders.orders);
	return (
		<View style={styles.screen}>
			<FlatList
				data={orders}
				keyExtractor={order => order.orderId}
				renderItem={({ item }) =>
					renderOrderItem(item, showDetails, setShowDetails)
				}
			/>
		</View>
	);
}

OrdersScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: "Your Orders",
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
	},
});
