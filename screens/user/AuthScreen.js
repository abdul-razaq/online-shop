import React, { useState, useReducer } from "react";
import {
	KeyboardAvoidingView,
	ScrollView,
	View,
	TextInput,
	Button,
	StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Card from "../../components/UI/Card";
import PrimaryText from "../../components/commons/PrimaryText";
import Colors from "../../constants/Colors";

function authReducer(state, action) {
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
		formIsValid: false,
	});

	return (
		<View style={styles.screen}>
			<LinearGradient style={styles.gradient} colors={["orangered", "purple"]}>
				<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
					<Card style={styles.authContainer}>
						<ScrollView>
							<View style={styles.form}>
								<PrimaryText style={styles.label}>Email</PrimaryText>
								<TextInput
									style={styles.textInput}
									placeholder="Email address"
									autoCapitalize="none"
									keyboardType="email-address"
									onChangeText={text => setEmail(text)}
								/>
							</View>
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
									onChangeText={text => setPassword(text)}
								/>
							</View>
							<View style={styles.button}>
								<Button
									title="LOGIN"
									color={Colors.primaryColor}
									onPress={() => {}}
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
	},
	button: {
		paddingTop: 10,
	},
});
