import React, { Component } from "react";
import Tab3 from "./index";
import { Remarks } from "../../../../redux/actions/userActions";
import { connect } from "react-redux";
class MainThird extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    var info;
    if (this.props.user.remarks) {
      info = this.props.user.remarks;
    }
    console.log(info);
    return (
      <>
        <Tab3
          navigation={this.props.navigation}
          Remarks={this.props.Remarks}
          info={info}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { Remarks })(MainThird);
