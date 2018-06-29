import React, {Component} from "react";
import "../style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";

class CartItem extends Component {

  render() {
    return (
      <pre className="CartItem">
        {JSON.stringify(this.props.cartItem, null, 2)}
      </pre>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(CartItem);
