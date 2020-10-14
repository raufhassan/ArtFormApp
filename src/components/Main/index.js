import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Home/Home";
import Tab1 from "../Form/Tab1";
import Tab2 from "../Form/Tab2";
import Tab3 from "../Form/Tab3";
import MainFirst from "../Form/Tab1/Main";
import MainSecond from "../Form/Tab2/Main";
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
          <Stack.Screen name="Tab1" component={MainFirst} />
          <Stack.Screen name="Tab2" component={MainSecond} />
          <Stack.Screen name="Tab3" component={Tab3} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
