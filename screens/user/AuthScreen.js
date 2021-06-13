import React, { useState, useReducer } from "react";
import {
	KeyboardAvoidingView,
	ScrollView,
	View,
	TextInput,
	Button,
	StyleSheet,
	Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Card from "../../components/UI/Card";
import PrimaryText from "../../components/commons/PrimaryText";
import Colors from "../../constants/Colors";

const INPUT_UPDATE = "INPUT_UPDATE";
const INPUT_ON_BLUR = "INPUT_ON_BLUR";

function authReducer(state, action) {
	switch (action.type) {
		case INPUT_UPDATE:
			const { value, inputType, isValid } = action.payload;
			const updatedAuthValues = {
				...state.authValues,
				[inputType]: value,
			};
			const updatedAuthValidities = {
				...state.authValidities,
				[inputType]: isValid,
			};
			return {
				...state,
				authValues: updatedAuthValues,
				authValidities: updatedAuthValidities,
				formIsValid:
					updatedAuthValidities.email && updatedAuthValidities.password,
			};
		case INPUT_ON_BLUR:
			return {
				...state,
				touched: true,
			};
	}
	return state;
}

export default function AuthScreen(props) {
	const [authState, dispatchAuthState] = useReducer(authReducer, {
		authValues: {
			email: "",
			password: "",
		},
		authValidities: {
			email: false,
			password: false,
		},
		touched: false,
		formIsValid: false,
	});

	function onChangeTextHandler(inputType, text) {
		let isValid = true;
		switch (inputType) {
			case "email":
				const emailRe =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!text.trim().length || !emailRe.test(text.toLowerCase())) {
					isValid = false;
				}
				break;
			case "password":
				if (text.trim() === "" || text.trim().length < 8) {
					isValid = false;
				}
				break;
			default:
				isValid = true;
		}

		dispatchAuthState({
			type: INPUT_UPDATE,
			payload: {
				inputType,
				value: text,
				isValid,
			},
		});
	}

	function onLoginHandler() {
		if (!authState.formIsValid) {
			Alert.alert("Incorrect input", "please, check your input fields.", [
				{ text: "Okay" },
			]);
			return;
		}
		const credentials = {
			email: authState.authValues.email,
			password: authState.authValues.password,
		};
		console.log(credentials);
	}

	return (
		<View style={styles.screen}>
			<LinearGradient style={styles.gradient} colors={["orangered", "purple"]}>
				<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
					<ScrollView>
						<Card style={styles.authContainer}>
							<ScrollView>
								<View style={styles.form}>
									<PrimaryText style={styles.label}>Email</PrimaryText>
									<TextInput
										style={styles.textInput}
										placeholder="Email address"
										autoCapitalize="none"
										keyboardType="email-address"
										value={authState.authValues.email}
										onChangeText={onChangeTextHandler.bind(null, "email")}
										onBlur={() => dispatchAuthState({ type: INPUT_ON_BLUR })}
									/>
								</View>

								{authState.touched && !authState.authValidities.email && (
									<PrimaryText style={{ color: "red" }}>
										invalid email address
									</PrimaryText>
								)}

								<View style={styles.form}>
									<PrimaryText style={styles.label}>Password</PrimaryText>
									<TextInput
										style={styles.textInput}
										placeholder="Password"
										autoCapitalize="none"
										keyboardType="default"
										minLength={8}
										maxLength={20}
										secureTextEntry
										value={authState.authValues.password}
										onChangeText={onChangeTextHandler.bind(null, "password")}
										onBlur={() => dispatchAuthState({ type: INPUT_ON_BLUR })}
									/>
								</View>
								{authState.touched && !authState.authValidities.password && (
									<PrimaryText style={{ color: "red" }}>
										invalid password
									</PrimaryText>
								)}
								<View style={styles.button}>
									<Button
										title="LOGIN"
										color={Colors.primaryColor}
										onPress={onLoginHandler}
										disabled={!authState.formIsValid}
									/>
								</View>
								<View style={styles.button}>
									<Button
										title="SWITCH TO SIGN UP"
										color={Colors.accentColor}
										onPress={() => {}}
									/>
								</View>
							</ScrollView>
						</Card>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	gradient: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	authContainer: {
		width: "100%",
		maxWidth: 400,
		maxHeight: 400,
		padding: 10,
	},
	form: {
		paddingVertical: 10,
	},
	textInput: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.primaryColor,
		paddingVertical: 10,
	},
	button: {
		paddingTop: 10,
	},
});
