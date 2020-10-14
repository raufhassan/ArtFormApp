import React, { Component } from "react";
import Form from "./index";
import { saveID } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.handleEvent = this.handleEvent.bind(this)
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Form navigation={this.props.navigation} saveID={this.props.saveID} />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  saveID,
})(Home);
