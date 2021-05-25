import { Platform } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ordersScreen from "../screens/user/OrdersScreen";
import ManageUserProductsScreen from "../screens/user/ManageUserProductsScreen";

import Colors from "../constants/Colors";

// configure the entire navigator
const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
	},
	headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor,
};

const ProductsStackNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetails: ProductDetailsScreen,
	},
	{
		// configure the entire navigator
		defaultNavigationOptions,
	}
);

const OrdersStackNavigator = createStackNavigator(
	{
		Orders: ordersScreen,
	},
	{ defaultNavigationOptions }
);

const ManageUserProductsStackNavigator = createStackNavigator(
	{
		ManageUserProducts: ManageUserProductsScreen,
	},
	defaultNavigationOptions
);

const MainDrawerNavigator = createDrawerNavigator(
	{
		Shop: {
			screen: ProductsStackNavigator,
			navigationOptions: {
				drawerLabel: "Shop",
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
				drawerLabel: "ManageProducts",
			},
		},
	},
	{
		backBehavior: "history",
		hideStatusBar: true,
		drawerBackgroundColor: "#fff",
		drawerType: "slide",
	}
);

export default createAppContainer(MainDrawerNavigator);
