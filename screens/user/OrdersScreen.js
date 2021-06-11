import React, { useState, useEffect } from "react";
import {
	View,
	FlatList,
	ActivityIndicator,
	StyleSheet,
	Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Center from "../../components/commons/Center";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

import ordersActions from "../../store/actions/orders";
import PrimaryText from "../../components/commons/PrimaryText";
import Colors from "../../constants/Colors";

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

	const dispatch = useDispatch();

	async function retrieveOrders() {
		setError("");
		setIsLoading(true);
		try {
			await dispatch(ordersActions.fetchOrders());
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}

	useEffect(() => {
		retrieveOrders();
	}, [retrieveOrders]);

	if (error) {
		<Center>
			<PrimaryText>error</PrimaryText>
			<Button
				title="Try again"
				color={Colors.primaryColor}
				onPress={retrieveOrders}
			/>
		</Center>;
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
			<Center>
				<PrimaryText>
					No orders yet. go to product overview and start adding some products
					to cart
				</PrimaryText>
			</Center>
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
