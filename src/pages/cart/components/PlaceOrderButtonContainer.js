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
      userEmail: ""
    }
  }

  updateGuestEmail(event) {
    this.setState({
      userEmail: event.target.value
    });
  }

  getValidationState() {
    // Email validation regex
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.userEmail).toLowerCase()) ? 'success' : null;
  }

  placeOrder() {
    if (this.props.cartItems === undefined || this.props.cartItems === null || this.props.cartItems.length <= 0) {
      this.props.publishCartMessage(
        "Your cart is empty. Get some tickets!",
        "info"
      );
      return;
    }
    const apiName = "ProjectYetiOrderService";
    const path = "/create";
    const myInit ={
      body: {
        orderItemList: this.props.cartItems,
        buyerId: "cslilingfei@outlook.com"
      }
    };
    API.post(apiName, path, myInit)
      .then(data => {
        console.log(`Successfully created order. response data: ${JSON.stringify(data, null, 2)}`);
        this.props.publishCartMessage(
          "Successfully created order! Order Id: " + data.orderId,
          "success"
        );
        this.props.nukeCart();
      })
      .catch(error => {
        console.error(`Error creating order. Error: ${JSON.stringify(error, null, 2)}`);
        this.props.publishCartMessage(
          "Failed to create order. " + error.response.data.message,
          "danger"
        );
      });
  }

  showSignInModal() {
    alert("This will be a sign in modal");
  }

  render() {
    return (
      <div className="placeOrderButtonContainer">
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Your Email Address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.userEmail}
              placeholder="login@amazon.com"
              onChange={event => this.updateGuestEmail(event)}
            />
            <FormControl.Feedback />
            <HelpBlock>Note: you need to be a blue-badge Amazonian to pick up the tickets</HelpBlock>
          </FormGroup>
          <Button className="placeOrderButton" bsStyle="default" onClick={() => this.showSignInModal()}>Sign In</Button>
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
