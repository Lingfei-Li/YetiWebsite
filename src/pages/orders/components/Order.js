import React, {Component} from "react";
import "../style.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";

class Order extends Component {

  state = {
  };

  render() {
    const order = this.props.order;

    return (
      <div className="order">
        <div>
          <span><strong>Order Id: </strong></span>
          <span>{order.orderId}</span>
        </div>
        <div>
          <span><strong>Payment Status: </strong></span>
          <span>{order.paymentStatus}</span>
        </div>
        <div>
          <span><strong>Transaction Status: </strong></span>
          <span>{order.transactionStatus}</span>
        </div>
        <div>
          <span><strong>Order Items: </strong></span>
          {Object.keys(order.orderItems).map(orderItemId => {
            return (
              <div key={orderItemId}>
                <p>{order.orderItems[orderItemId].quantity}</p>
                <p>{order.orderItems[orderItemId].itemId}</p>
              </div>
              )
          })}
          {/*{order.orderItems.map(orderItem => {*/}
            {/*return (<span>{JSON.stringify(orderItem, null, 2)}</span>)*/}
          {/*})}*/}
        </div>
        {/*<pre>*/}
          {/*{JSON.stringify(this.props.order, null, 2)}*/}
        {/*</pre>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
