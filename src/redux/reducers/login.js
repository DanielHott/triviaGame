import { GET_TOKEN, USER_INFORMATION, USER_SCORE } from '../actions';

const INITIAL_STATE = { player: {}, token: '' };

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFORMATION:
    return { ...state,
      player: { name: action.name,
        email: action.email,
        gravatarEmail: action.email } };
  case GET_TOKEN:
    return {
      ...state,
      token: action.data,
    };
  case USER_SCORE:
    return {
      ...state,
      player: { ...state.player,
        score: action.score,
        assertions: action.assertions },
    };
  default:
    return state;
  }
}
