import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { enableScreens } from "react-native-screens";

import React, { useState } from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";

// Remove this import before deploying the App.
// import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./store";

import ShopNavigator from "./navigation/shopNavigator";

enableScreens();

// composeWithDevTools() was added as the second argument to this createStore function during development to view state data in Redux devtools.
const appStore = createStore(rootReducer);

function loadFonts() {
	return Font.loadAsync({
		"koho-regular": require("./assets/fonts/KoHo-Regular.ttf"),
		"koho-bold": require("./assets/fonts/KoHo-Bold.ttf"),
	});
}

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (!fontsLoaded) {
		return (
			<AppLoading
				startAsync={loadFonts}
				onFinish={() => setFontsLoaded(true)}
				onError={err => console.error(err)}
			/>
		);
	}
	return (
		<Provider store={appStore}>
			<ShopNavigator />
		</Provider>
	);
}
