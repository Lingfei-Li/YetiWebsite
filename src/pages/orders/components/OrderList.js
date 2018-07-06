import React, {Component} from "react";
import "../style.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import Order from "./Order";

class OrderList extends Component {

  state = {
  };

  render() {

    return (
      <div className="orderList">
        { this.props.orders.map(order => <Order order={order} key={order.orderId}/>) }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
