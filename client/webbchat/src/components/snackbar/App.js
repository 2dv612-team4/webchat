
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../../actions/actionCreators';
import GeneralSnackbar from './Snackbar';

const mapStateToProps = (state) => {
  return {
    updateSnackbar: state.snackbar,
    snackbar: state.snackbar,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch);

const AppState = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSnackbar);

export default AppState;
