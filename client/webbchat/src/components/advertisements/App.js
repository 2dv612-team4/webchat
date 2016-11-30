import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../../actions/actionCreators';
import Advertisement from './Advertisement';

const mapStateToProps = (state) => {
  return {
    isPremium: state.isPremium,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch);

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Advertisement);

export default App;
