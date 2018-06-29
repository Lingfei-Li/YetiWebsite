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
      {purchaseQuantity: event}
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
  }

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
          ${ticket.unitPrice}
        </div>
        <div>
          {ticket.distributionLocation}
        </div>
        <div>
          {moment.unix(ticket.distributionStartDateTime).format("h:mm:ss a M/D (dddd)")}
        </div>
        <div>
          {moment.unix(ticket.distributionEndDateTime).format("h:mm:ss a M/D (dddd)")}
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
