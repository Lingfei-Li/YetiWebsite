import React, {Component} from "react";
import {Auth} from "aws-amplify";
import himalaya from "../../resources/himalaya.png";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import CartIcon from "./components/CartIcon";
import classNames from 'classnames';
import { withRouter } from 'react-router';

class Header extends Component {

  signOut() {
    Auth.signOut()
      .then(data => {
        console.log("Sign out successfully. Data: " + JSON.stringify(data, null, 2));
        this.props.signOut()
      })
      .catch(err => {
        console.log("Sign out failed. Err: " + JSON.stringify(err, null, 2));
      })
  }

  signIn() {
    this.props.openSignInModal();
  }

  render() {

    const routeName = this.props.location.pathname;

    const componentsAfterSignIn = (
      <ul className="nav navbar-nav navbar-right">
        <li className={classNames({'active': routeName === "/account"})}><a href="/account">{this.props.username}<span className="sr-only">(current)</span></a></li>
        <li><a href="#" onClick={() => this.signOut()}>Sign Out<span className="sr-only">(current)</span></a></li>
        <li className={classNames({'active': routeName === "/orders"})}><a href="/orders">Orders<span className="sr-only">(current)</span></a></li>
        <li className={classNames({'active': routeName === "/cart"})}><CartIcon /></li>
      </ul>
    );

    const componentsBeforeSignIn = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={() => this.signIn()}>Sign In<span className="sr-only">(current)</span></a></li>
        <li className={classNames({'active': routeName === "/cart"})}><CartIcon /></li>
      </ul>
    );

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
              <li className={classNames({'active': routeName === "/tickets"})}><a href="/tickets">Tickets<span className="sr-only">(current)</span></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              { this.props.isSignedIn ? componentsAfterSignIn : componentsBeforeSignIn }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    activePage: state.activePage,
    isSignedIn: state.isSignedIn,
    username: state.username
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

