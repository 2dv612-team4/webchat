const changePassword = (state = [], action) => {

  switch (action.type) {
  case 'CHANGE_PASSWORD':
    return action.changePassword;
  default:
    return state;
  }
};

export default changePassword;
