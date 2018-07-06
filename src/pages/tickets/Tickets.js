import React, {Component} from "react";
import "./style.css";
import {API} from "aws-amplify";
import TicketList from "./components/TicketList";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";
import InfoBox from "../components/InfoBox";

class Tickets extends Component {

  constructor() {
    super();
    this.state = {
      tickets: [],
      ticketReservationQuantity: {}
    };
  }

  componentWillMount() {
    // Clear the message box since redux is persisted
    this.props.publishTicketsInfoBoxMessage("", "hidden");

    this.getTickets();
  }

  getTickets() {
    const apiName = "ProjectYetiTicketService";
    const path = "/get-open";
    const myInit ={
      body: {}
    };
    API.post(apiName, path, myInit)
      .then(data => {
        console.log("Tickets: " + JSON.stringify(data.tickets, null, 2));
        this.setState({tickets: data.tickets});
        this.getTicketReservationQuantity()
      })
      .catch(error => {
        console.error(`Error getting tickets. Error: ${JSON.stringify(error, null, 2)}`);
      });
  }

  getTicketReservationQuantity() {
    const ticketIdList = this.state.tickets.map(t => t.ticketId);

    ticketIdList.forEach(ticketId => {
      const apiName = "ProjectYetiOrderService";
      const path = "/get-reservation-quantity";
      const myInit ={
        body: {
          ticketId
        }
      };
      API.post(apiName, path, myInit)
        .then(data => {
          console.log("Tickets Id: " + ticketId);
          console.log("Tickets reservation quantity: " + JSON.stringify(data.quantity, null, 2));
          const currentTicketReservationQuantity = Object.assign({}, this.state.ticketReservationQuantity);
          currentTicketReservationQuantity[ticketId] = data.quantity;
          this.setState({ticketReservationQuantity: currentTicketReservationQuantity});
        })
        .catch(error => {
          console.error(`Error getting ticket reservation quantity. Error: ${JSON.stringify(error, null, 2)}`);
        });
    });
  }

  render() {
    return (
      <div className="ticketsPage">

        <InfoBox type={this.props.ticketsInfoBoxMessageType} message={this.props.ticketsInfoBoxMessageContent}/>

        <TicketList tickets={this.state.tickets} reservationQuantity={this.state.ticketReservationQuantity}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    ticketsInfoBoxMessageContent: state.ticketsInfoBoxMessageContent,
    ticketsInfoBoxMessageType: state.ticketsInfoBoxMessageType,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(Tickets);
