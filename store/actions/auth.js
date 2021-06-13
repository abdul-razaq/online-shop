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

		if (!response.ok) throw new Error("Something went wrong!");

		const resData = await response.json();
		console.log(resData);

		dispatch({
			type: actionTypes.SIGN_UP,
			payload: {
				email,
				password,
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

		if (!response.ok) throw new Error("Something went wrong!");

		const resData = await response.json();
		console.log(resData);

		dispatch({
			type: actionTypes.LOGIN,
			payload: {
				email,
				password,
			},
		});
	};
}

export default {
	signUp,
	logIn,
};
