import React, {Component} from "react";
import {API} from "aws-amplify";
import "../style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

class PlaceOrderButtonContainer extends Component {

  constructor() {
    super();
    this.state = {
      emailValidationEnforced: false,
      placeOrderRequestOnTheFly: false,
      showSignInSignUpModal: false
    }
  }

  updateUserEmailAddress(event) {
    const userEmail = event.target.value;
    this.props.updateUsername(userEmail)
  }

  getUserEmailAddressValidationState() {
    // Email validation regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.props.username).toLowerCase())) return 'success';
    if (this.state.emailValidationEnforced) return 'error';
    return null;
  }

  validateEmailAddress() {
    this.setState({emailValidationEnforced: true});
    // Check user email address (for guests)
    if (!(this.getUserEmailAddressValidationState() === 'success')) {
      this.props.publishCartInfoBoxMessage(
        "Please provide a valid email address",
        "info"
      );
      return false;
    }
    return true;
  }

  placeOrder() {
    if (!this.validateEmailAddress()) return;

    // Check cart items
    if (this.props.cartItems === undefined || this.props.cartItems === null || Object.keys(this.props.cartItems).length <= 0) {
      this.props.publishCartInfoBoxMessage(
        "Your cart is empty. Get some tickets!",
        "info"
      );
      return;
    }

    // Now place order...
    console.log("Placing order...");
    const apiName = "ProjectYetiOrderService";
    const path = "/create";
    const cartItemsList = Object.keys(this.props.cartItems).map(itemId => this.props.cartItems[itemId]);
    console.log("Overriding buyer ID to cslilingfei@outlook.com to prevent accidental");
    const myInit ={
      body: {
        orderItemList: cartItemsList,
        buyerId: "cslilingfei@outlook.com"
      }
    };
    API.post(apiName, path, myInit)
      .then(data => {
        console.log(`Successfully created order. response data: ${JSON.stringify(data, null, 2)}`);
        this.props.publishCartInfoBoxMessage(
          "Successfully created order! Order Id: " + data.orderId,
          "success"
        );
        this.props.nukeCart();
        this.setState({
          placeOrderRequestOnTheFly: false
        });
      })
      .catch(error => {
        console.error(`Error creating order. Error: ${JSON.stringify(error, null, 2)}`);
        if (error.response && error.response.data && error.response.data.message) {
          this.props.publishCartInfoBoxMessage(
            "Failed to create order. " + error.response.data.message,
            "danger"
          );
        } else {
          this.props.publishCartInfoBoxMessage(
            "Failed to create order. &nbsp" +
            "<div> Please contact <a href='mailto:project-yeti-oncall@amazon.com'>Project Yeti Team</a> or Chime <a href='mailto:lingfeil@amazon.com'>lingfeil@amazon.com</a></div>",
            "danger"
          );
        }
        this.setState({
          placeOrderRequestOnTheFly: false
        });
      });
    this.setState({
      placeOrderRequestOnTheFly: true
    });
  }

  openSignUpModal() {
    if (this.validateEmailAddress()) {
      this.props.openSignUpModal();
    }
  }

  openSignInModal() {
    if (this.validateEmailAddress()) {
      this.props.openSignInModal();
    }
  }

  render() {
    if (this.state.placeOrderRequestOnTheFly) {
      return "Submitting order...Please wait";
    } else if (this.props.cartItems === undefined || this.props.cartItems === null || Object.keys(this.props.cartItems).length <= 0) {
      return null;
    }

    const componentsBeforeSignIn = (
      <form>
        <FormGroup
          controlId="userEmail"
          validationState={this.getUserEmailAddressValidationState()}
        >
          <ControlLabel>Your Email Address</ControlLabel>
          <FormControl
            type="text"
            value={this.props.username}
            placeholder="login@amazon.com"
            onChange={event => this.updateUserEmailAddress(event)}
          />
          <FormControl.Feedback />
          <HelpBlock>Note: you need a blue badge to pick up the tickets</HelpBlock>
        </FormGroup>

        <div className="placeOrderButtonContainer">
          <div className="signInSignUpContainer">
            <Button className="placeOrderButton" bsStyle="primary" onClick={() => this.openSignUpModal()}>Sign Up</Button>
            <a className="placeOrderButton" onClick={() => this.openSignInModal()}>Sign In</a>
          </div>

          <div className="placeOrderButtonSeparator" />

          <div className="placeOrderAsGuestContainer">
            <Button className="placeOrderButton" bsStyle="default" onClick={() => this.placeOrder()}>Place Order As Guest</Button>
          </div>
        </div>
      </form>
    );
    const componentsAfterSignIn = (
      <div>
        <p><strong>Payment instructions will be sent to {this.props.username}</strong></p>
        <Button className="placeOrderButton" bsStyle="primary" onClick={() => this.placeOrder()}>Place Order</Button>
      </div>
    );

    return (
      <div className="placeOrderInputContainer">
        {this.props.isSignedIn ? componentsAfterSignIn : componentsBeforeSignIn}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    isSignedIn: state.isSignedIn,
    username: state.username
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(PlaceOrderButtonContainer);
