import React, {Component} from "react";
import {Auth} from "aws-amplify";
import himalaya from "../../resources/himalaya.png";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import CartIcon from "./components/CartIcon";
import classNames from 'classnames';
import { withRouter } from 'react-router';
import {Nav, Navbar, NavItem} from "react-bootstrap";

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

    const rhsNavAfterSignIn = (
      <Nav pullRight>
        <NavItem eventKey={2} href="/account" active={routeName === "/account"}>
          {this.props.username}
        </NavItem>
        <NavItem eventKey={3} onClick={() => this.signOut()}>
          Sign out
        </NavItem>
        <NavItem eventKey={4} href="/orders" active={routeName === "/orders"}>
          Orders
        </NavItem>
        <NavItem eventKey={5} href="/cart" active={routeName === "/cart"}>
          <CartIcon />
        </NavItem>
      </Nav>
    );

    const rhsNavBeforeSignIn = (
      <Nav pullRight>
        <NavItem eventKey={3} onClick={() => this.signIn()}>
          Sign in
        </NavItem>
        <NavItem eventKey={5} href="/cart" active={routeName === "/cart"}>
          <CartIcon />
        </NavItem>
      </Nav>
    );

    return (
      <Navbar fluid bsStyle="default">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img alt="Yeti" src={himalaya} className="App-logo"/>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/tickets" active={routeName === "/tickets"}>
              Tickets
            </NavItem>
          </Nav>
          { this.props.isSignedIn ? rhsNavAfterSignIn : rhsNavBeforeSignIn}
        </Navbar.Collapse>
      </Navbar>
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

