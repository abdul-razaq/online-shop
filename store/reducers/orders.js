import { actionTypes } from '../actions/orders';

const initialState = {
  orders: [],
};

export default function ordersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.ADD_ORDER:
      
    default:
      return state;
  }
}