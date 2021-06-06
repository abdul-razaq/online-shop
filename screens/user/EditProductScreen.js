import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	ScrollView,
	TextInput,
	Platform,
	StyleSheet,
	Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import TitleText from "../../components/commons/TitleText";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

import productActions from "../../store/actions/products";

export default function EditProductScreen(props) {
	const { navigation } = props;
	const productId = navigation.getParam("productId");

	const product = useSelector(state =>
		state.products.userProducts.find(product => product.productId === productId)
	);

	const [title, setTitle] = useState(product ? product.productTitle : "");
	const [price, setPrice] = useState(product ? product.productPrice : "");
	const [imageURL, setImageURL] = useState(
		product ? product.productImageURL : ""
	);
	const [description, setDescription] = useState(
		product ? product.productDescription : ""
	);

	const dispatchFunction = useDispatch();

	const submitProductHandler = useCallback(() => {
		const productDetails = {
			title,
			price,
			imageURL,
			description,
		};

		if (productId) {
			dispatchFunction(productActions.updateProduct(productId, productDetails));
			Alert.alert("success!", "product updated successfully!");
			navigation.goBack();
		} else {
			dispatchFunction(productActions.addProduct(productDetails));
			Alert.alert("success!", "product added successfully!");
			navigation.goBack();
		}
	}, [dispatchFunction, title, price, imageURL, description]);

	useEffect(() => {
		navigation.setParams({
			submit: submitProductHandler,
		});
	}, [submitProductHandler]);

	return (
		<View style={styles.screen}>
			<ScrollView>
				<View style={styles.formContainer}>
					<View style={styles.form}>
						<TitleText style={styles.label}>Title</TitleText>
						<TextInput
							style={styles.textInput}
							onChangeText={text => setTitle(text)}
							value={title}
							placeholder="Product title"
						/>
					</View>
					{!productId && (
						<View style={styles.form}>
							<TitleText style={styles.label}>Price</TitleText>
							<TextInput
								style={styles.textInput}
								onChangeText={text => setPrice(text)}
								value={String(price)}
								placeholder="Product price"
							/>
						</View>
					)}
					<View style={styles.form}>
						<TitleText style={styles.label}>Image URL</TitleText>
						<TextInput
							style={styles.textInput}
							onChangeText={text => setImageURL(text)}
							value={imageURL}
							placeholder="Product image URL"
						/>
					</View>
					<View style={styles.form}>
						<TitleText style={styles.label}>Description</TitleText>
						<TextInput
							style={styles.textInput}
							onChangeText={text => setDescription(text)}
							value={description}
							placeholder="Product description"
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

EditProductScreen.navigationOptions = navigationData => {
	const productTitle = navigationData.navigation.getParam("productTitle");
	const submitHandler = navigationData.navigation.getParam("submit");

	return {
		headerTitle: productTitle ? `Edit ${productTitle}` : "Add new product",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="submit"
					iconName={
						Platform.OS === "android"
							? "md-checkmark-circle"
							: "ios-checkmark-circle"
					}
					onPress={submitHandler}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	formContainer: {
		margin: 20,
	},
	form: {
		width: "100%",
		marginBottom: 20,
	},
	label: {
		fontSize: 20,
	},
	textInput: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomColor: Colors.primaryColor,
		borderBottomWidth: 2,
	},
});
