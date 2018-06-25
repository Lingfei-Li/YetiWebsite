import React, {Component} from "react";
import "./style.css";
import {API} from "aws-amplify";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";

class Cart extends Component {

  render() {
    return (
      <div className="Cart">
        This is the cart page
      </div>
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

export default connect( mapStateToProps, mapDispatchToProps)(Cart);
