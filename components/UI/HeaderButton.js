import React from "react";
import { Platform } from "react-native";

import { HeaderButton } from "react-navigation-header-buttons";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
export default function CustomHeaderButton(props) {
	return (
		<HeaderButton
      {...props}
			IconComponent={Ionicons}
			color={Platform.OS === "android" ? "#fff" : Colors.primaryColor}
      iconSize={23}
		/>
	);
}
