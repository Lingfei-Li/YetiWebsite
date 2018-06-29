import React, {Component} from "react";
import "./style.css";
import {Auth, API} from "aws-amplify";
import TicketList from "./components/TicketList";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";

class Tickets extends Component {

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
    const apiName = "ProjectYetiTicketService";
    const path = "/get-open";
    const myInit ={
      body: {}
    };
    Auth.pickupCredentials();
    API.post(apiName, path, myInit)
      .then(data => {
        this.setState({tickets: data.tickets});
      })
      .catch(error => {
        console.error(`Error getting tickets. Error: ${JSON.stringify(error, null, 2)}`);
      });
  }

  render() {
    return (
      <div className="TicketsPage">
        <TicketList tickets={this.state.tickets} />
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

export default connect( mapStateToProps, mapDispatchToProps)(Tickets);
