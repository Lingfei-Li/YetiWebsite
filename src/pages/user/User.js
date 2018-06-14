import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, {Auth, API} from 'aws-amplify';
import classNames from 'classnames';
import {Button} from 'react-bootstrap';

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

    this.state = {
      "signInResult": "Not Started",
      "idToken": "N/A"
    }
  }

  async getTickets() {
    try {
      const apiName = "ProjectYetiTicketService";
      const path = "/get-open";
      console.log("getting idToken");
      const session = await Auth.currentSession();
      console.log("session: " + JSON.stringify(session, null, 2));
      const idToken = session.idToken;
      console.log("idToken: " + JSON.stringify(idToken, null, 2));
      const jwtToken = idToken.jwtToken;
      console.log("jwtToken: " + JSON.stringify(jwtToken, null, 2));
      const myInit ={
        headers: {
          Authorization: jwtToken
        },
        body: {}
      };
      const tickets = await API.post(apiName, path, myInit);
      console.log(`Tickets: ${JSON.stringify(tickets, null, 2)}`);
    } catch (error) {
      console.log("Error getting tickets: " + JSON.stringify(error, null, 2));
    }
  }

  signIn() {
    this.setState({
      "signInResult": "Working..."
    });
    const username = "lingfeil@amazon.com";
    const password = "123123";
    Auth.signIn(username, password)
      .then((data) => {
        this.setState({
          "signInResult": `Success! Response:\n${JSON.stringify(data, null, 2)}`
        });
      })
      .catch((error) => {
        this.setState({
          "signInResult": `Error! Response:\n${JSON.stringify(error, null, 2)}`
        });
      });

  }

  async getSession() {
    try {
      const currentSession = await Auth.currentSession();
      console.log("currentSession: " + JSON.stringify(currentSession, null, 2));
    } catch (error) {
      console.log("currentSession error! " + JSON.stringify(error, null, 2));
    }
  };

  getUser() {
    Auth.currentAuthenticatedUser()
      .then(data => {
        console.log(`getUser data: ${JSON.stringify(data, null, 2)}`);
      })
      .catch(error => {
        console.log(`getUser error: ${JSON.stringify(error, null, 2)}`);
      });
  }

  render() {

    const btnStyle = classNames("btn btn-primary");

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Button bsStyle="primary">Bootstrap Primary Button</Button>

        <div>
          <button className={btnStyle} onClick={() => this.signIn()}>Sign In</button>
        </div>

        <div>
          <button onClick={() => this.getSession()}>Get Session</button>
        </div>

        <div>
          <button onClick={() => this.getUser()}>Get User</button>
        </div>

        <div>
          <button onClick={() => this.getTickets()}>Get Tickets</button>
        </div>

        <pre>{this.state.signInResult}</pre>
        <p>{this.state.idToken}</p>
      </div>
    );
  }
}

export default App;
