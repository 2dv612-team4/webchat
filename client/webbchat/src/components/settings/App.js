
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../../actions/actionCreators';
import Settings from './Settings';

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch);

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default App;