import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import Style from "./style";
import AsyncStorage from "@react-native-community/async-storage";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
    };

    // this.handleEvent = this.handleEvent.bind(this);
  }
  async onSubmit(e) {
    e.preventDefault();
    var userId = this.state.id;
    await AsyncStorage.setItem("id", userId);
    this.props.navigation.navigate("Tab1");
  }

  async componentDidMount() {
    /*   if (AsyncStorage.getItem("id") !== null) {
      this.props.navigation.navigate("Form");
    } else {
      console.log("enter id");
    } */
    try {
      var value = await AsyncStorage.getItem("id");
      if (value !== "") {
        // We have data!!
        console.log(value);
        this.props.navigation.navigate("Tab1");
      }
    } catch (error) {
      // Error retrieving data
      console.log("enter user id");
    }
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
