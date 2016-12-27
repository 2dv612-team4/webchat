import React, { Component } from 'react';
import { Button, Textfield } from 'react-mdl';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect';

class ReportUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reason: '',
    };
  }

  acceptReport() {
    const reporteduser = this.state.reporteduser;
    const reportedby = this.props.username;
    const reason = this.state.reason;

    if(reason !== ""){
        webchatEmitter.emit('report-user', reporteduser, reportedby, reason);
        this.closeReport();
        return;
      }
      this.props.updateSnackbar({
        display: true,
        text: 'Reason not accepted, try again!',
      });
  }

  closeReport() {
    webchatEmitter.emit('report-user-settings', false);
  }

  reasonInput(input){
    this.setState({reason: input});
  }

  render() {
    const reportUser = this.props.reportUser;
    if(reportUser){
      return (
        <div id="reportContainer">
          <p>Report user: {reportUser}?</p>

          <Textfield id="reasonForReportField"
            label='State the reason for the report'
            onChange={(event) => this.reasonInput(event.target.value)}
            floatingLabel
            required
          />

          <Button id="settingsbuttonAccept" raised colored ripple type='button'
            onClick={() => this.acceptReport()}>Accept
          </Button>

          <Button id="settingsbuttonDecline" raised ripple type='button'
            onClick={() => this.closeReport()}>No
          </Button>
        </div>
      );
    }
    return null;
  }
}

export default connect((state) => ({
  username: state.username,
  reportUser: state.reportUser,
  updateSnackbar: state.updateSnackbar,
}), ReportUser);
