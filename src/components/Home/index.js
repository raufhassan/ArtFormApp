import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import Style from "./style";
import AsyncStorage from "@react-native-community/async-storage";
import user from "../../../redux/reducers/user";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
    };

    // this.handleEvent = this.handleEvent.bind(this);
  }
  componentDidMount() {}
  onSubmit() {
    // var data;
    var userId = this.state.id;
    // this.props.saveID(userId);
    /* data = {
      id: this.setState.id,
      name: "hassan",
      contact: parseInt("37647324"),
      email: "raufhassan41@gmail.com",
    }; */
    // this.props.insertUser(data);
    this.props.saveID(parseInt(userId));
    this.props.navigation.navigate("Tab1");
    // console.log(userId);
    // this.props.insertUser(data);
    // this.props.saveID(userId);
    // console.log(data);

    /* await AsyncStorage.setItem("id", userId);
    this.props.navigation.navigate("Tab1"); */
  }

  async componentDidMount() {
    /*   if (AsyncStorage.getItem("id") !== null) {
      this.props.navigation.navigate("Form");
    } else {
      console.log("enter id");
    } */
    /*     try {
      var value = await AsyncStorage.getItem("id");
      if (value !== "") {
        // We have data!!
        console.log(value);
        this.props.navigation.navigate("Tab1");
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
    // console.log(this.props.navigation.state);
    // let isFocused = this.props.navigation.isFocused();
    // console.log("home", isFocused);
    return (
      <View style={Style.container}>
        <Text style={Style.myText}>Enter User ID</Text>
        <TextInput
          value={String(this.state.id)}
          onChangeText={(value) => this.setState({ id: value })}
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Tab2")}
        >
          <Text> Go to tab2 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Tab3")}
        >
          <Text> Go to tab3 </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
