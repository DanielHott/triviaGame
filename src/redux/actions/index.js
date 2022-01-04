export const REQUEST_API = 'REQUEST_API';
export const GET_TOKEN = 'GET_TOKEN';
export const USER_INFORMATION = 'USER_INFORMATION';
export const USER_SCORE = 'USER_SCORE';
export const requestAPI = () => ({ type: REQUEST_API });
export const getToken = (data) => ({ type: GET_TOKEN, data });

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((tokenId) => dispatch(getToken(tokenId.token)));
  };
}

export function setUser(state) {
  return function actionAdd(dispatch) {
    return dispatch({
      type: USER_INFORMATION,
      name: state.name,
      email: state.email,
    });
  };
}

export function setScore(state) {
  return function score(dispatch) {
    return dispatch({
      type: USER_SCORE,
      score: state.score,
    });
  };
}
