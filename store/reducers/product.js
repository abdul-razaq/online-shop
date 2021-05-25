import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
  products: PRODUCTS,
}

export default function productsReducer(state = initialState, action) {
  return state;
};
