import React, { useEffect, useCallback, useReducer } from "react";
import {
	View,
	ScrollView,
	TextInput,
	Platform,
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import TitleText from "../../components/commons/TitleText";
import PrimaryText from "../../components/commons/PrimaryText";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

import productActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_ON_BLUR = "FORM_ON_BLUR";

function formReducer(state, action) {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedInputValues = {
			...state.inputValues,
			[action.input]: action.value,
		};

		const updatedInputValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};

		let formIsValid;
		for (let key of Object.keys(updatedInputValidities)) {
			formIsValid = formIsValid && updatedInputValidities[key];
		}
		return {
			inputValues: updatedInputValues,
			inputValidities: updatedInputValidities,
			formIsValid,
		};
	} else if (action.type === FORM_ON_BLUR) {
		return {
			...state,
			touched: true,
		};
	}
	return state;
}

export default function EditProductScreen(props) {
	const { navigation } = props;
	const productId = navigation.getParam("productId");

	const product = useSelector(state =>
		state.products.userProducts.find(product => product.productId === productId)
	);

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: product ? product.productTitle : "",
			price: product ? product.productPrice : "",
			description: product ? product.productDescription : "",
			imageURL: product ? product.productImageURL : "",
		},
		inputValidities: {
			title: product ? true : false,
			price: product ? true : false,
			description: product ? true : false,
			imageURL: product ? true : false,
		},
		formIsValid: product ? true : false,
		touched: false,
	});

	const dispatchFunction = useDispatch();

	function textChangeHandler(inputIdentifier, text) {
		let isValid = false;
		if (text.trim().length > 0) {
			isValid = true;
		}

		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: text,
			isValid,
			input: inputIdentifier,
		});
	}

	const submitProductHandler = useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert("Wrong input!", "Please check the errors in the form.", [
				{
					text: "Okay",
				},
			]);
			return;
		}
		const productDetails = {
			title: formState.inputValues.title,
			price: formState.inputValues.price,
			imageURL: formState.inputValues.imageURL,
			description: formState.inputValues.description,
		};

		if (productId) {
			dispatchFunction(productActions.updateProduct(productId, productDetails));
			Alert.alert("success!", "product updated successfully!");
		} else {
			dispatchFunction(productActions.addProduct(productDetails));
			Alert.alert("success!", "product added successfully!");
		}
		navigation.goBack();
	}, [dispatchFunction, productId, formState]);

	useEffect(() => {
		navigation.setParams({
			submit: submitProductHandler,
		});
	}, [submitProductHandler]);

	return (
		<View style={styles.screen}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior="padding"
				keyboardVerticalOffset={100}
			>
				<ScrollView>
					<View style={styles.formContainer}>
						<View style={styles.form}>
							<TitleText style={styles.label}>Title</TitleText>
							<TextInput
								style={styles.textInput}
								onChangeText={textChangeHandler.bind(null, "title")}
								value={formState.inputValues.title}
								placeholder="Product title"
								autoCapitalize="sentences"
								keyboardType="default"
								autoCorrect
								returnKeyType="next"
								onBlur={() => dispatchFormState({ type: FORM_ON_BLUR })}
							/>
							{!formState.inputValidities.title && formState.touched && (
								<View style={styles.errorContainer}>
									<PrimaryText styles={styles.errorText}>
										Please enter a valid text!
									</PrimaryText>
								</View>
							)}
						</View>
						{!productId && (
							<View style={styles.form}>
								<TitleText style={styles.label}>Price</TitleText>
								<TextInput
									style={styles.textInput}
									onChangeText={textChangeHandler.bind(null, "price")}
									value={String(formState.inputValues.price)}
									placeholder="Product price"
									keyboardType="decimal-pad"
									returnKeyType="next"
									onBlur={() => dispatchFormState({ type: FORM_ON_BLUR })}
								/>
							</View>
						)}
						<View style={styles.form}>
							<TitleText style={styles.label}>Image URL</TitleText>
							<TextInput
								style={styles.textInput}
								onChangeText={textChangeHandler.bind(null, "imageURL")}
								value={formState.inputValues.imageURL}
								placeholder="Product image URL"
								autoCapitalize="sentences"
								keyboardType="default"
								autoCorrect
								returnKeyType="next"
								onBlur={() => dispatchFormState({ type: FORM_ON_BLUR })}
							/>
						</View>
						<View style={styles.form}>
							<TitleText style={styles.label}>Description</TitleText>
							<TextInput
								style={styles.textInput}
								onChangeText={textChangeHandler.bind(null, "description")}
								value={formState.inputValues.description}
								placeholder="Product description"
								autoCapitalize="sentences"
								keyboardType="default"
								autoCorrect
								returnKeyType="done"
								onBlur={() => dispatchFormState({ type: FORM_ON_BLUR })}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
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
	errorContainer: {
		marginVertical: 20,
	},
	errorInput: {
		color: "red",
		fontSize: 13,
	},
});
