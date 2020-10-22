import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import Tab1 from "../components/Form/Tab1";
import Tab2 from "../components/Form/Tab2";
import Tab3 from "../components/Form/Tab3";
const Stack = createStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome" }}
          hideNavBar={true}
        />
        <Stack.Screen name="Tab1" component={Tab1} />
        <Stack.Screen name="Tab2" component={Tab2} />
        <Stack.Screen name="Tab3" component={Tab3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
