export const tokenAndInfoSave = (token, name, email) => ({
  type: 'TOKEN_AND_INFO_RECEIVED',
  payload: { token, name, email },
});

export const scoreSave = (score) => ({
  type: 'SCORE',
  payload: { score },
});
