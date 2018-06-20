import React, {Component} from "react";
import himalaya from "./resources/himalaya.png";
import "./App.css";
import Amplify from "aws-amplify";
import TicketPage from "./pages/ticket/TicketPage";
import {Link, Route} from "react-router-dom";
import HelloPage from "./pages/hello/HelloPage";
import Header from "./pages/header/Header";

class App extends Component {

  constructor() {
    super();

    Amplify.configure({
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:d80cfb6a-63a0-42b0-8d7e-d1ae9c4cd71f',
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
            name: "ProjectYetiTicketService",
            endpoint: "https://jfqrm8l4aj.execute-api.us-west-2.amazonaws.com/dev-lingfeil/tickets"
          }
        ]
      }
    });

  }


  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header App-navbar-header">
              <a className="navbar-brand" href="/home">
                <img alt="Yeti" src={himalaya} className="App-logo"/>
              </a>
            </div>
          </div>
        </nav>

        <Header />

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/hello">Hello</Link>
        </nav>

        <div>
          <Route path="/home" component={TicketPage} />
          <Route path="/hello" component={HelloPage} />
        </div>
      </div>
    );
  }
}

export default App;
