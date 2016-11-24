
const pending = (state = [], action) => {

  switch (action.type) {
  case 'SET_PENDING_REQUESTS':
    return action.pending;
  default:
    return state;
  }
};

export default pending;
