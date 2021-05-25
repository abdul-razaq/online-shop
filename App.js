import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { enableScreens } from "react-native-screens";

import React, { useState } from "react";
import { Text, View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./store";

enableScreens();

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
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontFamily: "koho-bold", fontSize: 32}}>Online Shop</Text>
			</View>
		</Provider>
	);
}
