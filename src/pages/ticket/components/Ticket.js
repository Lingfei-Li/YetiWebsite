import React, {Component} from "react";

class Ticket extends Component {

  render() {

    const ticket = this.props.ticket;
    if (!ticket) {
      return null;
    }

    return (
      <div className="TicketContainer" key={ticket.ticketId}>
        <div>
          {ticket.ticketType}
        </div>
        <div>
          {ticket.ticketQuantity}
        </div>
        <div>
          {ticket.distributionLocation}
        </div>
      </div>
    );
  }

}

export default Ticket;
