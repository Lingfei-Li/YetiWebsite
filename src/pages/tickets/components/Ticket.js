import React, {Component} from "react";
import {Button, DropdownButton, MenuItem} from "react-bootstrap";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import moment from 'moment';

class Ticket extends Component {

  state = {
    purchaseQuantity: 1
  };


  selectQuantityForTicket(event) {
    this.setState(
      {purchaseQuantity: parseInt(event)}
    )
  }

  addTicketToCartItem(ticket) {
    const cartItem = {
      quantity: this.state.purchaseQuantity,
      itemId: ticket.ticketId,
      unitPrice: ticket.unitPrice, // Adding unit price for easier calculation of total payment
      itemSnapshot: Object.assign({}, ticket)
    };
    console.log(`Adding ${JSON.stringify(cartItem, null, 2)} to cart`);
    this.props.addToCart(cartItem);

    this.props.publishTicketsInfoBoxMessage("Ticket added to cart. &nbsp <a href='/cart'><b>Go to cart</b></a>", "success");
  }

  getAvailableQuantity() {
    if (this.props.reservationQuantity === undefined || this.props.reservationQuantity === null) {
      return "Loading ticket availability...";
    } else {
      if (Number.isInteger(this.props.ticket.ticketQuantity) && Number.isInteger(this.props.reservationQuantity)) {
        return (
          <div>
            {parseInt(this.props.ticket.ticketQuantity, 10) - parseInt(this.props.reservationQuantity, 10)} tickets left
          </div>
        );
      } else {
        return (
          <div>
            Oops...failed to load ticket availability
          </div>
        );
      }
    }
  }

  render() {
    const ticket = this.props.ticket;
    if (!ticket) {
      return null;
    }

    return (
      <div className="ticket" key={ticket.ticketId}>
        <div>
          {ticket.ticketType}
        </div>
        { this.getAvailableQuantity() }
        <div>
          ${ticket.unitPrice}
        </div>
        <div>
          Pick up location: {ticket.distributionLocation}
        </div>
        <div>
          Pick up start time: {moment.unix(ticket.distributionStartDateTime).format("h:mm:ss a M/D (dddd)")}
        </div>
        <div>
          Pick up end time: {moment.unix(ticket.distributionEndDateTime).format("h:mm:ss a M/D (dddd)")}
        </div>

        <DropdownButton
          bsStyle="default"
          title={this.state.purchaseQuantity}
          id="dropdown-basic"
          onSelect={event => this.selectQuantityForTicket(event)}
        >
          <MenuItem eventKey="1">1</MenuItem>
          <MenuItem eventKey="2">2</MenuItem>
          <MenuItem eventKey="3">3</MenuItem>
          <MenuItem eventKey="4">4</MenuItem>
          <MenuItem eventKey="5">5</MenuItem>
        </DropdownButton>

        <Button
          bsStyle="default"
          onClick={() => this.addTicketToCartItem(ticket)}
        >
          Add To Cart
        </Button>


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

export default connect( mapStateToProps, mapDispatchToProps)(Ticket);
