import React, {Component} from "react";
import {Button, DropdownButton, MenuItem} from "react-bootstrap";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";

class Ticket extends Component {

  state = {
    purchaseQuantity: 1
  };


  selectQuantityForTicket(event) {
    this.setState(
      {purchaseQuantity: event}
    )
  }

  addToCart() {
    const quant = this.state.purchaseQuantity;
    console.log(`Adding ${quant} "${this.props.ticket.ticketType}" to cart`);
  }

  render() {

    console.log(this.props);

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
          onClick={() => this.props.addToCart(ticket)}
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
