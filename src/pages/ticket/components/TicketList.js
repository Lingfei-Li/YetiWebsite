import React, {Component} from "react";
import Ticket from "./Ticket";

class TicketList extends Component {

  render() {

    const tickets = this.props.tickets;

    if (!tickets) {
      return null;
    }

    const ticketsView = tickets.map(t => <Ticket ticket={t} key={t.ticketId}/>);

    return (
      <div className="TicketListContainer">
        {ticketsView}
      </div>
    );
  }

}

export default TicketList;
