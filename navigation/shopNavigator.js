import { Platform } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

import OrdersScreen from "../screens/user/OrdersScreen";
import ManageUserProductsScreen from "../screens/user/ManageUserProductsScreen";
import CartScreen from "../screens/user/CartScreen";

import Colors from "../constants/Colors";

// configure the entire navigator
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
	}
);

const OrdersStackNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{ defaultNavigationOptions }
);

const ManageUserProductsStackNavigator = createStackNavigator(
	{
		ManageUserProducts: ManageUserProductsScreen,
	},
	{ defaultNavigationOptions }
);

const CartScreenStackNavigator = createStackNavigator(
	{
		Cart: CartScreen,
	},
	{ defaultNavigationOptions }
);

const MainDrawerNavigator = createDrawerNavigator(
	{
		Shop: {
			screen: ProductsStackNavigator,
			navigationOptions: {
				drawerLabel: "Shop",
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
				drawerLabel: "Manage products",
			},
		},
	},
	{
		hideStatusBar: false,
		drawerBackgroundColor: "#fff",
		defaultNavigationOptions,
	}
);

export default createAppContainer(MainDrawerNavigator);
