
const snackbar = (state = {}, action) => {
  switch (action.type) {
  case 'UPDATE_SNACKBAR':
    return action.snackbar;
  default:
    return state;
  }
};

export default snackbar;