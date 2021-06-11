import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Center from "../../components/commons/Center";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

import ordersActions from "../../store/actions/orders";

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

	const dispatch = useDispatch();

	const orders = useSelector(state => state.orders.orders);

	useEffect(() => {
		setError("");
		setIsLoading(true);
		try {
			dispatch(ordersActions.fetchOrders());
		} catch (error) {
			setError(error.message);
		}
	}, [dispatch]);

	if (error) {
		<Center>error</Center>;
	}

	if (isLoading) {
		return (
			<Center>
				<ActivityIndicator size="large" color={Colors.primaryColor} />
			</Center>
		);
	}

	if (!isLoading && !orders.length)
		return (
			<Center>No orders yet. go to product and start adding to cart</Center>
		);

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
