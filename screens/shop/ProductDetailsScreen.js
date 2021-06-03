import React from "react";
import {
	View,
	ScrollView,
	Image,
	Button,
	StyleSheet,
	Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PrimaryText from "../../components/commons/PrimaryText";

import Colors from "../../constants/Colors";

import cartActions from "../../store/actions/cart";

export default function ProductDetailsScreen(props) {
	const { navigation } = props;
	const selectedProduct = useSelector(state =>
		state.products.availableProducts.find(
			product => product.productId === navigation.getParam("productId")
		)
	);

	const dispatchFunction = useDispatch();

	return (
		<View style={styles.screen}>
			<ScrollView>
				<Image
					source={{ uri: selectedProduct.productImageURL }}
					style={styles.productImage}
					resizeMode="cover"
				/>
				<View style={styles.button}>
					<Button
						title="Add to cart"
						color={Colors.primaryColor}
						onPress={() => {
							dispatchFunction(cartActions.addToCart(selectedProduct));
							Alert.alert(
								"Item added to cart!",
								`${selectedProduct.productTitle} added to cart!`
							);
						}}
					/>
				</View>
				<PrimaryText style={styles.productPrice}>
					${selectedProduct.productPrice.toFixed(2)}
				</PrimaryText>
				<PrimaryText style={styles.productDescription}>
					{selectedProduct.productDescription}
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
		fontFamily: "koho-bold",
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
