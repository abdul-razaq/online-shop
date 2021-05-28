import React from "react";
import { View, ScrollView, Image, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import PrimaryText from "../../components/widgets/PrimaryText";

import Colors from "../../constants/Colors";

export default function ProductDetailsScreen(props) {
	const { navigation } = props;
	const product = useSelector(state =>
		state.products.availableProducts.find(
			product => product.productId === navigation.getParam("productId")
		)
	);

	return (
		<View style={styles.screen}>
			<ScrollView>
				<Image
					source={{ uri: product.productImageURL }}
					style={styles.productImage}
					resizeMode="cover"
				/>
				<View style={styles.button}>
					<Button
						title="Add to cart"
						color={Colors.primaryColor}
						onPress={() => {}}
					/>
				</View>
				<PrimaryText style={styles.productPrice}>
					${product.productPrice.toFixed(2)}
				</PrimaryText>
				<PrimaryText style={styles.productDescription}>
					{product.productDescription}
				</PrimaryText>
			</ScrollView>
		</View>
	);
}

ProductDetailsScreen.navigationOptions = navigationData => {
	const productTitle = navigationData.navigation.getParam("productTitle");

	return {
		headerTitle: productTitle,
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	productImage: {
		width: "100%",
		height: 250,
	},
	button: {
		alignItems: "center",
		marginVertical: 20,
	},
	productPrice: {
		color: "#888",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 20,
	},
	productDescription: {
		textAlign: "center",
		fontSize: 18,
	},
});
