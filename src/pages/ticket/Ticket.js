import React, {Component} from "react";
import FontAwesome from 'react-fontawesome'
import "./style.css";
import {API} from "aws-amplify";
import TicketList from "./components/TicketList";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";

class TicketPage extends Component {

  constructor() {
    super();
    this.state = {
      "tickets": []
    };
  }

  componentWillMount() {
    this.getTickets();
  }

  getTickets() {
    try {
      const apiName = "ProjectYetiTicketService";
      const path = "/get-open";
      const myInit ={
        body: {}
      };
      API.post(apiName, path, myInit)
        .then(data => {
          console.log(`Tickets: ${JSON.stringify(data.tickets, null, 2)}`);
          this.setState({tickets: data.tickets});
        })
        .catch(error => {
          console.error(`Error getting tickets. Error: ${JSON.stringify(error, null, 2)}`);
        });
    } catch (error) {
      console.log("Error getting tickets: " + JSON.stringify(error, null, 2));
    }
  }

  render() {
    return (
      <div className="TicketPage">
        <TicketList tickets={this.state.tickets} />
        FontAwesome
        <FontAwesome
          name="rocket"
          size="lg"
        />
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

export default connect( mapStateToProps, mapDispatchToProps)(TicketPage);
