import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Home/Home";
import List from "../Form/List";
import MainFirst from "../Form/Tab1/Main";
import MainSecond from "../Form/Tab2/Main";
import MainThird from "../Form/Tab3/Main";
const Stack = createStackNavigator();
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Welcome" }}
            hideNavBar={true}
          />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Tab1" component={MainFirst} />
          <Stack.Screen name="Tab2" component={MainSecond} />
          <Stack.Screen name="Tab3" component={MainThird} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
