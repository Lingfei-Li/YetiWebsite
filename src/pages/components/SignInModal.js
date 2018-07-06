import React, {Component} from "react";
import {Auth} from "aws-amplify";
import "./style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";

class SignInModal extends Component {

  constructor() {
    super();
    this.state = {
      password: ""
    }
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  async retrieveApiJwtToken() {
    console.log("Retrieving API jwt token");
    const data = await Auth.currentSession();
    if (data.idToken === undefined || data.idToken.jwtToken === undefined) {
      throw String("API jwtToken is empty");
    }
    return data.idToken.jwtToken;
  }

  async signIn() {
    try {
      await Auth.signIn(this.props.username, this.state.password);

      const apiJwtToken = await this.retrieveApiJwtToken();

      this.props.confirmSignIn(apiJwtToken);
      this.props.hideSignInModal();

      // window.location.reload();
    } catch(err) {
      console.log("Sign in failed. err: " + JSON.stringify(err, null, 2));
      this.setState({
        modalInfoBoxType: "danger",
        modalInfoBoxContent: err
      })
    }
  }

  render() {
    return (
      <Modal show={this.props.showSignInModal} onHide={() => this.props.hideSignInModal()}>
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup
              controlId="username"
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                value={this.props.username}
                placeholder="login@amazon.com"
                onChange={event => this.props.updateUsername(event.target.value)}
              />
              <FormControl.Feedback />
              <HelpBlock>Note: you need a blue badge to pick up the tickets</HelpBlock>
            </FormGroup>
          </form>
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
              <HelpBlock>Password must contain 6 digits</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.props.hideSignInModal()}>Close</Button>
          <Button bsStyle="primary" onClick={() => this.signIn()}>Sign In</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    showSignInModal: state.showSignInModal,
    username: state.username
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(SignInModal);
