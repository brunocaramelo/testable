import { SET_USER } from '../actions/userAction';

/**
 * @param action {object}
 */
export default (state = {}, action) => {
  switch (action.type) {
  case SET_USER:
    return Object.assign({}, state, {
      user: action.payload
    });
  default:
    return state;
  }
};
