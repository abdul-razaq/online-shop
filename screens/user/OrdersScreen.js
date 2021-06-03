import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

function renderOrderItem(item) {
	return (
		<OrderItem
			date={item.date.toLocaleString()}
			total={item.totalAmount}
			cartItems={item.cartItems}
		/>
	);
}

export default function OrdersScreen(props) {
	const orders = useSelector(state => state.orders.orders);
	return (
		<View style={styles.screen}>
			<FlatList
				data={orders}
				keyExtractor={order => order.orderId}
				renderItem={({ item }) => renderOrderItem(item)}
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
