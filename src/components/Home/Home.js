import React, { Component } from "react";
import Form from "./index";
import { saveID, insertCheck } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "UserDatabase.db" });
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS user(person_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INT(10),cnic_image VARCHAR(255), first_name VARCHAR(20), last_name VARCHAR(20), gender VARCHAR(10), guardian VARCHAR(10), religion VARCHAR(10), zakat VARCHAR(1), DOB VARCHAR(10), marital_status VARCHAR(10), husband_status VARCHAR(10) NULL, husband_profession VARCHAR(10) NULL, husband_income INT(10) NULL,husband_company VARCHAR(20) NULL, husband_unemp_type VARCHAR(20) NULL, husband_unemp_reason VARCHAR(40) NULL, address VARCHAR(40), house_ownership VARCHAR(10), monthly_rent INT(10) , town VARCHAR(10), area VARCHAR(20), profession VARCHAR(10), emp_status VARCHAR(10), monthly_income INT(10), skills VARCHAR(20), rent_exp INT(10), education_exp INT(10), utility_exp INT(10), overall_income INT(10), family_is VARCHAR(20), family_registered VARCHAR(20),disease VARCHAR(20),remarks VARCHAR(50),images VARCHAR(255))",
              []
            );
          }
        }
      );
    });
    // dependents table
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='dependents'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS dependents", []);
            // txn.executeSql("PRAGMA foreign_keys=on");
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS dependents(dep_id INTEGER PRIMARY KEY AUTOINCREMENT,person_id INT(10), dep_name VARCHAR(20), dep_relation VARCHAR(10), dep_DOB VARCHAR(20), dep_education VARCHAR(10), dep_income INT(15), councelling VARCHAR(10), education VARCHAR(10))",
              []
            );
          }
        }
      );
    });
    // check table
    /* db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_email VARCHAR(20))",
              []
            );
          }
        }
      );
    }); */
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.navigation.navigate("List");
    }
    this.focusListener = this.props.navigation.addListener("focus", () => {
      // Call ur function here.. or add logic.
      if (this.props.user.id) {
        // console.log("focused id", this.props.user.id);
        // this.props.navigation.navigate("Tab1");
      }
    });
  }

  render() {
    return (
      <>
        <Form
          navigation={this.props.navigation}
          saveID={this.props.saveID}
          insertCheck={this.props.insertCheck}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  saveID,
  insertCheck,
})(Home);
