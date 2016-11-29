
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../../../actions/actionCreators';
import Users from './Users';

const mapStateToProps = (state) => {
  return {
    users: state.otherUsers,
    updateSnackbar: state.updateSnackbar,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch); 

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default App;
