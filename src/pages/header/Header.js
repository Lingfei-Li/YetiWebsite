import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";

class Header extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.nukeCart()}>Nuke Cart</button>
        <pre>
          {JSON.stringify(this.props.cartItems, null, 2)}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(Header);

