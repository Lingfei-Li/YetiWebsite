import React, {Component} from "react";
import "./App.css";
import Amplify from "aws-amplify";
import Tickets from "./pages/tickets/Tickets";
import {Redirect, Route} from "react-router-dom";
import Header from "./pages/header/Header";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import Account from "./pages/account/Account";

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
  }


  render() {
    return (
      <div className="App">
        <Header />
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

export default App;
