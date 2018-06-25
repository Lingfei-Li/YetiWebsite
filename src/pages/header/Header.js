import React, {Component} from "react";
import himalaya from "../../resources/himalaya.png";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import CartIcon from "./components/CartIcon";
import classNames from 'classnames';
import { withRouter } from 'react-router';

class Header extends Component {

  render() {

    console.log("current path: " + this.props.location.pathname);

    const routeName = this.props.location.pathname;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/home">
              <img alt="Yeti" src={himalaya} className="App-logo"/>
            </a>
          </div>

          <div className="" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={classNames({'active': routeName === "/home"})}><a href="/home">Tickets<span className="sr-only">(current)</span></a></li>
              <li className={classNames({'active': routeName === "/order"})}><a href="/order">Orders<span className="sr-only">(current)</span></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <CartIcon />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  console.log("Header component: state: \n" + JSON.stringify(state, null, 2));
  return {
    cartItems: state.cartItems,
    activePage: state.activePage
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

