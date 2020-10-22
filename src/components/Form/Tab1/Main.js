import React, { Component } from "react";
import { Text, BackHandler } from "react-native";
import Tab1 from "./index";
import { personalInfo } from "../../../../redux/actions/userActions";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";
import user from "../../../../redux/reducers/user";

class MainFirst extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.user.user);
  }
  /*  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user !== this.props.user.user) {
      this.props.navigation.navigate("Tab2");
    }
  } */

  render() {
    var info, userID;
    if (isEmpty(this.props.user.user)) {
      info = null;
      console.log("empty");
    } else {
      info = this.props.user.user;
      console.log("not fu empty");
    }
    if (this.props.user.id !== null) {
      userID = this.props.user.id;
    } else {
      userID = null;
    }
    return (
      <>
        {/* <Text>Helllo</Text>
        {this.props.children} */}
        <Tab1
          navigation={this.props.navigation}
          personalInfo={this.props.personalInfo}
          info={info}
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
  personalInfo,
})(MainFirst);
