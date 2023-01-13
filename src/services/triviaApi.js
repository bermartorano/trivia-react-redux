const triviaApi = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await request.json();
  return response;
};

export default triviaApi;
