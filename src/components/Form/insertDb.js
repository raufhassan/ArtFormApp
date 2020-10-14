import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import Style from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "UserDatabase.db" });

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
    };
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql("PRAGMA foreign_keys=on");
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS [user](user_id INTEGER  NOT NULL PRIMARY KEY , first_name VARCHAR(50)  NULL,[last_name] ,VARCHAR(50)  NULL,[Gender] VARCHAR(50)  NULL,Religion VARCHAR(20),Zakat INTEGER, DOB VARCHAR(20) , Marital_status VARCHAR(20),cell VARCHAR(20), Address VARCHAR(20), Town VARCHAR(20),Area VARCHAR(20), Profession VARCHAR(20), Employement_status VARCHAR(20), Monthly_income VARCHAR(20), Skills VARCHAR(20) NULL  )"
            );
            // txn.executeSql(
            //   "CREATE TABLE IF NOT EXISTS [dependent] ([StudentId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,[StudentName] NVARCHAR(50)  NULL,[isPresent] NVARCHAR(50) DEFAULT false NOT NULL,[ClassId] INTEGER  NOT NULL,FOREIGN KEY(ClassId) REFERENCES Class(ClassId))"
            // );
            // txn.executeSql(
            //   "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_email VARCHAR(20))",
            //   []
            // );
          }
        }
      );
    });

    // this.handleEvent = this.handleEvent.bind(this);
  }
  async onSubmit(e) {
    e.preventDefault();
    var userId = this.state.id;
    await AsyncStorage.getItem("id", userId);
    this.props.navigation.navigate("Tab1");
  }

  async componentDidMount() {
    /*   if (AsyncStorage.getItem("id") !== null) {
      this.props.navigation.navigate("Form");
    } else {
      console.log("enter id");
    } */
    /*   try {
      var value = await AsyncStorage.getItem("id");
      if (value !== "") {
        // We have data!!
        console.log(value);
        this.props.navigation.navigate("Form");
      }
    } catch (error) {
      // Error retrieving data
      console.log("enter user id");
    } */
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevState.name !== this.state.name) {
  //     this.handler();
  //   }
  // }

  componentWillUnmount() {}

  // Prototype methods, Bind in Constructor (ES2015)
  // handleEvent() {}

  // Class Properties (Stage 3 Proposal)
  // handler = () => {
  //   this.setState();
  // };

  render() {
    return (
      <View style={Style.container}>
        <Text style={Style.myText}>Enter User ID</Text>
        <TextInput
          value={String(this.state.id)}
          onChangeText={(id) => this.setState({ id })}
          placeholder={"User Id"}
          style={Style.input}
        ></TextInput>
        <Button
          title={"Submit"}
          style={Style.submit}
          onPress={this.onSubmit.bind(this)}
        />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Tab1")}
        >
          <Text> Go to Form </Text>
        </TouchableOpacity>
        {/*   <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Tab2")}
        >
          <Text> Go to tab2 </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
