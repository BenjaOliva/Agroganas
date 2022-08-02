import getVisitCount from './../services/cookies';

const initialState = {
  visit_counter: getVisitCount(),
  loadingProducts: true,
  products: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'END_LOADING':
      return { ...state, loadingProducts: false, products: action.data };
    case 'ADD_PRODUCT':
      return { ...state, loadingProducts: false };
    default:
      return state;
  }
}
