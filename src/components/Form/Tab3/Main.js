import React, { Component } from "react";
import Tab3 from "./index";
import {
  Remarks,
  insertUser,
  insertDependents,
} from "../../../../redux/actions/userActions";
import { connect } from "react-redux";
class MainThird extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    var personalInfo, dependentInfo, remarks, userID;
    if (this.props.user.remarks) {
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
