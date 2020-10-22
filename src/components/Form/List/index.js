import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { connect } from "react-redux";
import { Logout } from "../../../../redux/actions/userActions";
import Style from "../styles";

var db = openDatabase({ name: "UserDatabase.db" });

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      record: [],
      userID: "",
    };
  }

  componentDidMount() {
    db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "SELECT * FROM 'user'",
        [],
        (tx, res) => {
          console.log("item:", res.rows.length);
          var len = res.rows.length;
          var data = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < len; i++) {
              //   console.log(res.rows.item(i));
              let row = res.rows.item(i);
              data.push(row.first_name);
              this.setState({ record: data });
            }
          }
        }
      );
    });
    if (this.props.user.id) {
      this.setState({ userID: this.props.user.id });
    }
    /*    db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "select last_insert_rowid() FROM 'user'",
        [],
        (tx, res) => {
          console.log("item:", res.rows.length);
          console.log(res.rows.item(0));
        }
      );
    }); */
  }
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
  handleBackButtonClick = () => {
    if (this.state.userID !== "") {
      BackHandler.exitApp();
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  };
  async onPress() {
    await this.props.Logout();
    this.props.navigation.navigate("Home");
  }
  onAdd() {
    this.props.navigation.navigate("Tab1");
  }
  render() {
    console.log("state", this.state.record);

    return (
      <View style={Style.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={Style.buttonStyle}
            onPress={this.onPress.bind(this)}
          >
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.buttonStyle}
            onPress={this.onAdd.bind(this)}
          >
            <Text style={{ color: "#fff" }}>Add new</Text>
          </TouchableOpacity>
        </View>

        <Text style={Style.myText}> List </Text>
        <FlatList
          data={this.state.record}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={Style.listItem}>
                <Text style={{ color: "#fff", fontSize: 15 }}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {/* <FlatList
          data={this.state.record}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        /> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  Logout,
})(List);
