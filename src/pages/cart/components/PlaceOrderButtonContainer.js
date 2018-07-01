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
      userEmail: "",
      placeOrderButtonClicked: false,
      placeOrderRequestOnTheFly: false
    }
  }

  updateUserEmailAddress(event) {
    this.setState({
      userEmail: event.target.value
    });
  }

  isUserEmailAddressValid() {
    // Email validation regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.state.userEmail).toLowerCase())) return 'success';
    if (this.state.placeOrderButtonClicked) return 'error';
    return null;
  }

  placeOrder() {
    this.setState({
      placeOrderButtonClicked: true
    });

    // Check user email address (for guests)
    if (!this.isUserEmailAddressValid()) {
      this.props.publishCartInfoBoxMessage(
        "Please provide a valid email address",
        "info"
      );
      return;
    }

    // Check cart items
    if (this.props.cartItems === undefined || this.props.cartItems === null || Object.keys(this.props.cartItems).length <= 0) {
      this.props.publishCartInfoBoxMessage(
        "Your cart is empty. Get some tickets!",
        "info"
      );
      return;
    }


    // Now place order...
    const apiName = "ProjectYetiOrderService";
    const path = "/create";
    const cartItemsList = Object.keys(this.props.cartItems).map(itemId => this.props.cartItems[itemId]);
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

  showSignInModal() {
    alert("This will be a sign in modal");
  }

  render() {
    if (this.state.placeOrderRequestOnTheFly) {
      return "Submitting order...Please wait";
    } else if (this.props.cartItems === undefined || this.props.cartItems === null || Object.keys(this.props.cartItems).length <= 0) {
      return null;
    }

    return (
      <div className="placeOrderButtonContainer">
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.isUserEmailAddressValid()}
          >
            <ControlLabel>Your Email Address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.userEmail}
              placeholder="login@amazon.com"
              onChange={event => this.updateUserEmailAddress(event)}
            />
            <FormControl.Feedback />
            <HelpBlock>Note: you need a blue badge to pick up the tickets</HelpBlock>
          </FormGroup>
          <Button className="placeOrderButton" bsStyle="primary" onClick={() => this.showSignInModal()}>Sign In</Button>
          <Button className="placeOrderButton" bsStyle="default" onClick={() => this.placeOrder()}>Place Order As Guest</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(PlaceOrderButtonContainer);
