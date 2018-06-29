import React, {Component} from "react";
import "../style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import CartItem from "./CartItem";

class CartItemContainer extends Component {

  render() {
    const cartItemComponents = this.props.cartItems.map((cartItem, index) => <CartItem key={index} cartItem={cartItem}/>);

    return (
      <div className="cartItemContainer">
        {cartItemComponents}
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

export default connect( mapStateToProps, mapDispatchToProps)(CartItemContainer);
