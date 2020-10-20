import React, { Component } from "react";
import Tab3 from "./index";
import {
  Remarks,
  insertUser,
  insertDependents,
} from "../../../../redux/actions/userActions";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";
import { BackHandler } from "react-native";

class MainThird extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      this.props.navigation.navigate("Home");
    }
  }

  componentDidMount() {}
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  render() {
    var personalInfo, dependentInfo, remarks, userID;
    if (isEmpty(this.props.user.remarks)) {
      remarks = null;
    } else {
      remarks = this.props.user.remarks;
    }
    if (this.props.user.dependent) {
      dependentInfo = this.props.user.dependent;
    }
    if (this.props.user.user) {
      personalInfo = this.props.user.user;
    }
    if (this.props.user.id) {
      userID = this.props.user.id;
    }
    return (
      <>
        <Tab3
          navigation={this.props.navigation}
          Remarks={this.props.Remarks}
          insertUser={this.props.insertUser}
          insertDependents={this.props.insertDependents}
          info={remarks}
          personalInfo={personalInfo}
          dependentInfo={dependentInfo}
          userID={userID}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  Remarks,
  insertUser,
  insertDependents,
})(MainThird);
