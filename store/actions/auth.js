export const actionTypes = {
	SIGN_UP: "SIGN_UP",
	LOGIN: "LOGIN",
};

function signUp(email, password) {
	return async function (dispatch) {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt2kNwMO92W7m3IN5PnXiRpXETiHXcXrw
`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
		});

		if (!response.ok) {
			let message = "Something terrible went wrong";
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			if (errorId === "EMAIL_EXISTS") {
				message = "This email address is already associated with another user";
			}
			throw new Error(message);
		}

		const resData = await response.json();

		dispatch({
			type: actionTypes.SIGN_UP,
			payload: {
				token: resData.idToken,
				userId: resData.localId,
			},
		});
	};
}

function logIn(email, password) {
	return async function (dispatch) {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt2kNwMO92W7m3IN5PnXiRpXETiHXcXrw
`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
		});

		if (!response.ok) {
			let message = "Something terrible went wrong.";
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			switch (errorId) {
				case "EMAIL_NOT_FOUND":
					message = "This email address is not associated with any user";
				case "INVALID_PASSWORD":
					message =
						"invalid credentials, check that your email address or password is correct";
			}
			throw new Error(message);
		}

		const resData = await response.json();

		dispatch({
			type: actionTypes.LOGIN,
			payload: {
				token: resData.idToken,
				userId: resData.localId,
			},
		});
	};
}

export default {
	signUp,
	logIn,
};
