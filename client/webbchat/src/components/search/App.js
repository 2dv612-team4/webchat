import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../../actions/actionCreators';
import Search from './Search';

const mapStateToProps = (state) => {
  return {
    filterQuery: state.userSearchQuery,
    setOtherUsers: state.setOtherUsers,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch); 

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default App;