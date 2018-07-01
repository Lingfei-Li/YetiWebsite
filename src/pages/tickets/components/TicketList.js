import React, {Component} from "react";
import Ticket from "./Ticket";

class TicketList extends Component {

  render() {

    const tickets = this.props.tickets;
    const reservationQuantity = this.props.reservationQuantity;

    if (!tickets) {
      return null;
    }

    const ticketsView = tickets.map(t => <Ticket ticket={t} reservationQuantity={reservationQuantity[t.ticketId]} key={t.ticketId}/>);

    return (
      <div className="ticketList">
        {ticketsView}
      </div>
    );
  }

}

export default TicketList;
