import React from "react";
import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from "react-native";

import PrimaryText from "../commons/PrimaryText";

export default function ProductItem(props) {
	const TouchableWrapper =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;

	const { product } = props;
	return (
		<View style={{ overflow: "hidden" }}>
			<TouchableWrapper onPress={props.onSelect} useForeground>
				<View style={styles.product}>
					<Image
						source={{
							uri: product.productImageURL,
						}}
						style={styles.image}
						resizeMode="cover"
					/>
					<PrimaryText>{product.productTitle}</PrimaryText>
					<PrimaryText style={{ color: "#888", fontSize: 16 }}>
						${product.productPrice.toFixed(2)}
					</PrimaryText>
					{props.children}
				</View>
			</TouchableWrapper>
		</View>
	);
}

const styles = StyleSheet.create({
	product: {
		height: 300,
		margin: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.26,
		shadowRadius: 10,
		shadowOffset: { height: 2, width: 0 },
		elevation: 8,
		backgroundColor: "#fff",
		alignItems: "center",
		overflow: "hidden",
	},

	image: {
		width: "100%",
		height: "60%",
	},
});
