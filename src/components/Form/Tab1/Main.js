import React, { Component } from "react";
import { Text } from "react-native";
import Tab1 from "./index";
import { personalInfo } from "../../../../redux/actions/userActions";
import { connect } from "react-redux";

class MainFirst extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.user.user);
  }

  render() {
    var info;
    if (this.props.user.user) {
      info = this.props.user.user;
    }
    return (
      <>
        {/* <Text>Helllo</Text>
        {this.props.children} */}
        <Tab1
          navigation={this.props.navigation}
          personalInfo={this.props.personalInfo}
          info={info}
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
