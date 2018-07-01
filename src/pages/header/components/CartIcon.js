import React, {Component} from "react";
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";

class CartIcon extends Component {

  isCartEmpty() {
    const cartItems = this.props.cartItems;
    return cartItems === undefined || cartItems === null || Object.keys(cartItems).length === 0;
  }

  getCartItemsCountText() {
    if (this.isCartEmpty()) {
      return null;
    } else {
      return <div className="cartIconItemsCount">{Object.keys(this.props.cartItems).length}</div>;
    }
  }

  render() {
    return (
    <a href="/cart" className="cartIconLink">
      <FontAwesomeIcon
        icon={faShoppingCart}
        size="lg"
        color={this.isCartEmpty() ? null : "#00699D"}
      />
      { this.getCartItemsCountText() }
    </a>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems
  }
};

export default connect( mapStateToProps, null)(CartIcon);
