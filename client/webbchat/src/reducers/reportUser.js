const reportUser = (state = [], action) => {

  switch (action.type) {
  case 'REPORT_USER':
    return action.reportUser;
  default:
    return state;
  }
};

export default reportUser;
