import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Center from "../../components/commons/Center";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

function renderOrdersItem(item) {
	return (
		<OrderItem
			date={item.date.toLocaleString()}
			total={item.totalAmount}
			cartItems={item.cartItems}
		/>
	);
}

export default function OrdersScreen(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const orders = useSelector(state => state.orders.orders);

	useEffect(() => {}, []);
	
	if (isLoading) {
		return (
			<Center>
				<ActivityIndicator size="large" color={Colors.primaryColor} />
			</Center>
		);
	}

	return (
		<View style={styles.screen}>
			<FlatList
				data={orders}
				keyExtractor={order => order.orderId}
				renderItem={({ item }) => renderOrdersItem(item)}
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
