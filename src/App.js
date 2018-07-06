import React, {Component} from "react";
import * as actions from "./redux/actions";
import "./App.css";
import Amplify, {Auth} from "aws-amplify";
import Tickets from "./pages/tickets/Tickets";
import {Redirect, Route} from "react-router-dom";
import Header from "./pages/header/Header";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import Account from "./pages/account/Account";
import SignInModal from "./pages/components/SignInModal";
import SignUpModal from "./pages/components/SignUpModal";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class App extends Component {

  constructor() {
    super();

    Amplify.configure({
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:4508c8af-8c22-45b9-9f89-99d7236d5443',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_WKlYIUFxd',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'pv0n9flbal1es0lob2t1mj5rf'
      },
      API: {
        endpoints: [
          {
            region: "us-west-2",
            service: "execute-api",
            name: "ProjectYetiTicketService",
            endpoint: "https://jfqrm8l4aj.execute-api.us-west-2.amazonaws.com/dev-lingfeil/tickets"
          },
          {
            region: "us-west-2",
            service: "execute-api",
            name: "ProjectYetiOrderService",
            endpoint: "https://gzcp4d3yzl.execute-api.us-west-2.amazonaws.com/dev-lingfeil/orders"
          }
        ]
      }
    });

    this.initApiJwtToken()
      .then(apiJwtToken => {
        this.props.confirmSignIn(apiJwtToken);
        this.props.hideSignUpModal();
      }).catch(err => {
        console.error("Error initiating API jwt token. Error: " + err);
        this.props.signOut();
      });
  }

  async initApiJwtToken() {
    const data = await Auth.currentSession();
    if (data.idToken !== undefined && data.idToken.jwtToken !== undefined) {
      return data.idToken.jwtToken;
    } else {
      throw String("API Jwt Token successfully retrieved but is empty")
    }
  }


  render() {
    return (
      <div className="App">
        <Header />

        <SignInModal />
        <SignUpModal />

        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/tickets"/>
          )}/>
          <Route path="/tickets" component={Tickets} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/account" component={Account} />
        </div>
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

export default connect( mapStateToProps, mapDispatchToProps)(App);

