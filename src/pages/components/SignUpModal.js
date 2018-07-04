import React, {Component} from "react";
import {Auth} from "aws-amplify";
import "./style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import InfoBox from "./InfoBox";

class SignUpModal extends Component {

  constructor() {
    super();
    this.state = {
      password: "",
      showVerificationCodeInput: false,
      verificationCode: "",
      modalInfoBoxType: "success",
      modalInfoBoxContent: ""
    }
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  updateVerificationCode(event) {
    this.setState({verificationCode: event.target.value})
  }

  signUp() {
    Auth.signUp(this.props.username, this.state.password)
      .then(data => {
        console.log("Sign up success: " + JSON.stringify(data, null, 2));
        this.setState({
          showVerificationCodeInput: true
        })
      })
      .catch(err => {
        console.log("Sign Up error");
        console.log(JSON.stringify(err, null, 2));
        this.setState({
          modalInfoBoxType: "danger",
          modalInfoBoxContent: err.message || err
        })
      })
  }

  confirmSignUp() {
    Auth.confirmSignUp(this.props.username, this.state.verificationCode)
      .then(data => {
        console.log("Confirm sign up success: " + JSON.stringify(data, null, 2));
        this.props.confirmSignIn();
        this.props.hideSignUpModal()
      })
      .catch(err => {
        console.log("Confirm Sign Up error");
        console.log(JSON.stringify(err, null, 2));
        this.setState({
          modalInfoBoxType: "danger",
          modalInfoBoxContent: err
        })
      })
  }

  render() {

    const verificationCodeInput = this.state.showVerificationCodeInput ? (
      <form>
        <FormGroup
          controlId="verificationCode"
        >
          <ControlLabel>Verification Code</ControlLabel>
          <FormControl
            type="text"
            value={this.state.verificationCode}
            placeholder="Verification Code"
            onChange={event => this.updateVerificationCode(event)}
            autoComplete="off"
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    ) : null;


    return (
      <Modal show={this.props.showSignUpModal} onHide={() => this.props.hideSignUpModal()}>
        <Modal.Header>
          <Modal.Title>Sign up as {this.props.username}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup
              controlId="password"
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="text"
                value={this.state.password}
                placeholder="Your password"
                onChange={event => this.updatePassword(event)}
              />
              <FormControl.Feedback />
              <HelpBlock>The password must have at least 6 digits</HelpBlock>
            </FormGroup>
          </form>

          {verificationCodeInput}

          <InfoBox type={this.state.modalInfoBoxType} message={this.state.modalInfoBoxContent}/>

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.props.hideSignUpModal()}>Close</Button>
          <Button bsStyle="primary" onClick={() => this.signUp()}>Sign Up</Button>
          <Button bsStyle="primary" onClick={() => this.confirmSignUp()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    showSignUpModal: state.showSignUpModal,
    username: state.username,
    isSignedIn: state.isSignedIn
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(SignUpModal);
