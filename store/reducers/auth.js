import { actionTypes } from "../actions/auth";

const initialState = {
	token: null,
	userId: null,
};

export default function (state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.SIGN_UP:
			return {
				token: payload.token,
				userId: payload.userId,
			};
		case actionTypes.LOGIN:
			return {
				token: payload.token,
				userId: payload.userId,
			};
		default:
			return state;
	}
}
