import React, {Component} from "react";
import "./style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";
import InfoBox from "../components/InfoBox";
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
    this.props.publishCartInfoBoxMessage("", "hidden");

    console.log(JSON.stringify(this.props.cartItems, null, 2));
    const isCartEmpty = this.props.cartItems === undefined || this.props.cartItems === null || Object.keys(this.props.cartItems).length <= 0;
    this.setState({isCartEmpty});

    if (isCartEmpty) {
      this.props.publishCartInfoBoxMessage(
        "Your cart is empty. &nbsp <a href='/tickets'>Get some tickets here!</a>",
        "info"
      );
    }
  }

  emptyCart() {
    this.props.publishCartInfoBoxMessage(
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
        <InfoBox type={this.props.cartInfoBoxMessageType} message={this.props.cartInfoBoxMessageContent}/>

        {cartItemComponents}

        {placeOrderButtonContainer}

        <div>
          <Button bsStyle="danger" onClick={() => this.emptyCart()}>Debug Only - Empty Cart</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    cartInfoBoxMessageContent: state.cartInfoBoxMessageContent,
    cartInfoBoxMessageType: state.cartInfoBoxMessageType,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(Cart);
