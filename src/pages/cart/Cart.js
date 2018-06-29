import React, {Component} from "react";
import "./style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";
import InfoBox from "./components/InfoBox";
import PlaceOrderButtonContainer from "./components/PlaceOrderButtonContainer";
import CartItemContainer from "./components/CartItemContainer";
import {Button} from "react-bootstrap";

class Cart extends Component {

  constructor() {
    super();
    this.state = {
      guestEmail: "",
      isCartEmpty: false
    }
  }

  componentWillMount() {
    // Clear the message box since redux is persisted
    this.props.publishCartMessage("", "hidden");

    console.log(JSON.stringify(this.props.cartItems, null, 2));
    const isCartEmpty = this.props.cartItems === undefined || this.props.cartItems === null || this.props.cartItems.length <= 0;
    this.setState({isCartEmpty});

    if (isCartEmpty) {
      this.props.publishCartMessage(
        "Your cart is empty. Get some tickets!",
        "info"
      );
    }
  }

  emptyCart() {
    this.props.publishCartMessage(
      "Cart Emptied",
      "info"
    );
    this.props.nukeCart();
  }

  render() {
    const cartItemComponents = this.state.isCartEmpty ? null : (<CartItemContainer />);

    const placeOrderButtonContainer = this.state.isCartEmpty ? null : (<PlaceOrderButtonContainer/>);
    return (
      <div className="cart">
        <InfoBox type={this.props.cartMessageType} message={this.props.cartMessageContent}/>

        {cartItemComponents}

        {placeOrderButtonContainer}

        <div>
          <Button bsStyle="danger" onClick={() => this.emptyCart()}>Empty Cart</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    cartMessageContent: state.cartMessageContent,
    cartMessageType: state.cartMessageType,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(Cart);
