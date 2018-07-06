/* eslint no-eval: 0 */

import React, {Component} from "react";
import "./style.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions";
import {API} from "aws-amplify";
import InfoBox from "../components/InfoBox";
import {DropdownButton, MenuItem} from "react-bootstrap";
import moment from "moment";
import OrderList from "./components/OrderList";

class Orders extends Component {

  state = {
    orders: [],
    isLoadingOrders: false,
    orderFilters: [],
    orderFilterName: "Filter"
  };

  populateOrdersData() {
    if (!this.props.isSignedIn) return;

    this.setState({
      isLoadingOrders: true
    });

    const apiName = "ProjectYetiOrderService";
    const path = "/get-by-user-id";
    const myInit ={
      body: {
        userId: this.props.username
      },
      headers: {
        Authorization: this.props.apiJwtToken
      }
    };

    API.post(apiName, path, myInit)
      .then(data => {
        if (data.orders === undefined) {
          throw String("Our API didn't return what we expected")
        }
        const orders = data.orders;
        console.log("Orders: " + JSON.stringify(data.orders, null, 2));
        this.setState({orders: orders});
      }).catch(err => {
        console.error(`Error getting orders for the user ID. Error: ${JSON.stringify(err, null, 2)}`);
        this.props.publishOrdersInfoBoxMessage(`We could not retrieve your orders. ${err}`, "danger");
      }).then(() => {
        this.setState({
          isLoadingOrders: false
        });
    });
  }

  componentWillMount() {
    this.props.publishOrdersInfoBoxMessage("", ""); // Clean message box
    if (this.props.isSignedIn) {
      this.populateOrdersData();
    }
  }

  setOrderFilter(filterName, filterExpression) {
    this.setState({
      orderFilterName: filterName,
      orderFilters: [
        filterExpression
      ]
    });
  }

  filteredOrdersComponent() {
    console.log(JSON.stringify(this.state.orderFilters, null, 2));

    if (this.state.orders.length === 0) return null;

    const filteredOrders = this.state.orders.filter(order => {
      return this.state.orderFilters.reduce((filterResult, filterExpression) => {
        return filterResult && eval(filterExpression);
      }, true)
    });

    if (filteredOrders.length === 0) {
      return <p><strong>0 results</strong></p>

    }

    console.log(`filteredOrders: ${JSON.stringify(filteredOrders)}`);

    return <OrderList orders={filteredOrders} />;

    // return filteredOrders.map((order, index) => {
    //   return <pre key={index}>{JSON.stringify(order, null, 2)}</pre>
    // });

  }

  render() {

    const orderLoadingIndicator = (
      <div><strong>Loading your orders...</strong></div>
    );

    const ordersMainComponent =
      !this.props.isSignedIn ?
        <InfoBox message="Sign in to view your orders" type="info" />
        :
        this.state.isLoadingOrders ? orderLoadingIndicator :
          this.state.orders.length > 0 ?
            this.filteredOrdersComponent()
            :
            <InfoBox message="You have no order history so far. &nbsp<a href='/tickets'>Buy some tickets now!</a>" type="info" />;

    const filterDropdown = (
      <DropdownButton
        bsStyle={"default"}
        title={this.state.orderFilterName}
        id="orderFilterDropdown"
      >
        <MenuItem eventKey="1" active={this.state.orderFilterName === "Awaiting Pickup"}
                  onClick={() => this.setOrderFilter("Awaiting Pickup", "order.paymentStatus === 'PAID_IN_FULL' && order.transactionStatus === 'OPEN'")}>
          Awaiting Pickup
        </MenuItem>
        <MenuItem eventKey="4" active={this.state.orderFilterName === "Picked Up"}
                  onClick={() => this.setOrderFilter("Picked Up", "order.transactionStatus === 'ITEM_PICKED_UP'")}>
          Picked Up
        </MenuItem>
        <MenuItem eventKey="2" active={this.state.orderFilterName === "Awaiting Payment"}
                  onClick={() => this.setOrderFilter("Awaiting Payment", `order.paymentStatus === 'NOT_PAID' && order.transactionStatus === 'OPEN' && order.paymentDeadlineEpochSeconds > ${moment().unix()}`)}>
          Awaiting Payment
        </MenuItem>
        <MenuItem eventKey="3" active={this.state.orderFilterName === "Expired"}
                  onClick={() => this.setOrderFilter("Expired", `order.paymentStatus === 'NOT_PAID' && order.paymentDeadlineEpochSeconds <= ${moment().unix()}`)}>
          Expired
        </MenuItem>

        <MenuItem divider />

        <MenuItem eventKey="99" active={this.state.orderFilterName === "All orders"}
                  onClick={() => this.setOrderFilter("All orders", "true")}>
          All orders
        </MenuItem>
      </DropdownButton>
    );

    const filterPanel = (
      <div className="orderFilterPanel">
        <h3>My Orders</h3>
        {filterDropdown}
      </div>
    );

    return (
      <div className="ordersPage">
        <InfoBox message={this.props.ordersInfoBoxMessageContent} type={this.props.ordersInfoBoxMessageType} />
        {filterPanel}
        {ordersMainComponent}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    isSignedIn: state.isSignedIn,
    apiJwtToken: state.apiJwtToken,
    ordersInfoBoxMessageContent: state.ordersInfoBoxMessageContent,
    ordersInfoBoxMessageType: state.ordersInfoBoxMessageType
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
