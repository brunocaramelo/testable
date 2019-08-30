import { SET_LOCALE } from '../actions/localeAction';

/**
 * @param action {object}
 */
export default (state = { locale: 'en' }, action) => {
  switch (action.type) {
  case SET_LOCALE:
    return Object.assign({}, state, {
      locale: action.payload
    });
  default:
    return state;
  }
};
