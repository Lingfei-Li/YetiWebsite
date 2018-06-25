import React, {Component} from "react";
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";

class CartIcon extends Component {

  render() {
    return (
    <a href="/cart" className="cartIcon">
      <FontAwesomeIcon
        icon={faShoppingCart}
        size="lg"
      />
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
