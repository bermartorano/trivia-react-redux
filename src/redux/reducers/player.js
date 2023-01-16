const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};
const info = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TOKEN_AND_INFO_RECEIVED':
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.name,
      email: action.payload.email,
    };
  case 'SCORE':
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};
export default info;
