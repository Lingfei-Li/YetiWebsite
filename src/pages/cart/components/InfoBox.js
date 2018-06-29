import React, {Component} from "react";
import "../style.css";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import classNames from 'classnames';
import {connect} from "react-redux";

class InfoBox extends Component {

  getBoxClassName(content, type) {
    if (type === null) return '';
    return  classNames({
      cartMessageInfoBox: true,
      alert: true,
      hidden: type === "hidden" || !content || content === "",
      'alert-success': type === "success",
      'alert-info': type === "info",
      'alert-warning': type === "warning",
      'alert-danger': type === "danger"
    });
  }

  render() {
    return (
      <div className={this.getBoxClassName(this.props.message, this.props.type)}>
        {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(InfoBox);
