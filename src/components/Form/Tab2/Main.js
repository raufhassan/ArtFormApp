import React, { Component } from "react";
import Tab2 from "./index";
import { connect } from "react-redux";
import { DependentInfo } from "../../../../redux/actions/userActions";
class MainSecond extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    var info;
    if (this.props.user.dependent) {
      info = this.props.user.dependent;
    }
    return (
      <>
        <Tab2
          navigation={this.props.navigation}
          DependentInfo={this.props.DependentInfo}
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
  DependentInfo,
})(MainSecond);
