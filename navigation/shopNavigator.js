import React from "react";
import { Platform } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

import OrdersScreen from "../screens/user/OrdersScreen";
import ManageUserProductsScreen from "../screens/user/ManageUserProductsScreen";
import CartScreen from "../screens/user/CartScreen";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// configure the default navigation options
const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
	},
	headerTitleStyle: {
		fontFamily: "koho-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "koho-regular",
	},
	headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor,
};

const ProductsStackNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetails: ProductDetailsScreen,
	},
	{
		// configure the entire navigator with the default navigation options.
		defaultNavigationOptions,
		// Configure this ProductsStackNavigator if it is A SCREEN of another Navigator e.g ProductsStackNavigator is used as a screen in the Main Side Drawer Navigator.
		navigationOptions: {
			drawerIcon: drawerConfig => {
				// drawerConfig gives details about our drawer e.g the TintColor.
				return (
					<Ionicons
						name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
						size={23}
						color={drawerConfig.tintColor}
					/>
				);
			},
		},
	}
);

const OrdersStackNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		defaultNavigationOptions, // Configure this OrdersStackNavigator if it is A SCREEN of another Navigator e.g OrdersStackNavigator is used as a screen in the Main Side Drawer Navigator.
		navigationOptions: {
			drawerIcon: drawerConfig => {
				// drawerConfig gives details about our drawer e.g the TintColor.
				return (
					<Ionicons
						name={Platform.OS === "android" ? "md-list" : "ios-list"}
						size={23}
						color={drawerConfig.tintColor}
					/>
				);
			},
		},
	}
);

const ManageUserProductsStackNavigator = createStackNavigator(
	{
		ManageUserProducts: ManageUserProductsScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => {
				return (
					<Ionicons
						name={Platform.OS === "android" ? "md-create" : "ios-create"}
						size={23}
						color={drawerConfig.tintColor}
					/>
				);
			},
		},
		defaultNavigationOptions,
	}
);

const CartScreenStackNavigator = createStackNavigator(
	{
		Cart: CartScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => {
				return (
					<Ionicons
						name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
						size={23}
						color={drawerConfig.tintColor}
					/>
				);
			},
		},
		defaultNavigationOptions,
	}
);

const MainDrawerNavigator = createDrawerNavigator(
	{
		Shop: {
			screen: ProductsStackNavigator,
			navigationOptions: {
				drawerLabel: "Products",
			},
		},
		Cart: {
			screen: CartScreenStackNavigator,
			navigationOptions: {
				drawerLabel: "Cart",
			},
		},
		Orders: {
			screen: OrdersStackNavigator,
			navigationOptions: {
				drawerLabel: "Orders",
			},
		},
		ManageProducts: {
			screen: ManageUserProductsStackNavigator,
			navigationOptions: {
				drawerLabel: "Manage Products",
			},
		},
	},
	{
		contentOptions: {
			activeTintColor: Colors.primaryColor,
		},
		hideStatusBar: false,
		drawerBackgroundColor: "#fff",
		defaultNavigationOptions,
	}
);

export default createAppContainer(MainDrawerNavigator);
