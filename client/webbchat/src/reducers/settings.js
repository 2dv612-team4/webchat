
const settings = (state = [], action) => {

  switch (action.type) {
  case 'SET_USERNAME_REQUESTS':
    return action.username;
  default:
    return state;
  }
};

export default settings;
