import React, {Component} from "react";
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";

class CartIcon extends Component {

  getCartItemsCount() {
    if (this.props.cartItems.length === 0) {
      return null;
    } else {
      return <div className="cartIconItemsCount">{this.props.cartItems.length}</div>;
    }
  }

  render() {
    return (
    <a href="/cart" className="cartIcon">
      <FontAwesomeIcon
        icon={faShoppingCart}
        size="lg"
      />
      { this.getCartItemsCount() }
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
