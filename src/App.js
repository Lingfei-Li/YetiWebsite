import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify from "aws-amplify";
import TicketPage from "./pages/ticket/TicketPage";

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <TicketPage />

      </div>
    );
  }
}

export default App;
