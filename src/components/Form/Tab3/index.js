import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Picker,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Style from "../styles";
import RadioForm from "react-native-simple-radio-button";
import SelectMultiple from "react-native-select-multiple";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-community/async-storage";

const options = ["Ration", "Education ", "Small Business Support", "Health"];

var radio_props = [
  { label: "Most deserving", value: "Most deserving" },
  { label: "deserving ", value: 1 },
  { label: "Not deserving ", value: "Not deserving" },
  { label: "Temporarily relief ", value: "Temporarily relief" },
];

export default class Tab3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      familyIs: "",
      selectedFor: [],
      disease: "",
      Remarks: "",
    };
  }
  onSelectionsChange = (selectedFor) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFor });
  };
  async componentDidMount() {
    try {
      const retrievedItem = await AsyncStorage.getItem("DependentInfo");
      const item = JSON.parse(retrievedItem);
      console.log("data of async", item);
    } catch (error) {
      console.log(error.message);
    }
  }
  onHealth = () => {
    var count = 0;
    this.state.selectedFor.map((item) => {
      if (item.value === "Health") {
        count = count + 1;
      }
    });
    console.log(count);
    if (count == 1) {
      return (
        <View style={{ marginVertical: 10 }}>
          <DropDownPicker
            items={[
              { label: "hepatitas", value: "hepatitas" },
              { label: "Cancer", value: "Cancer" },
              { label: "Covid 19", value: "Covid 19" },
            ]}
            defaultValue={this.state.disease}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fafafa" }}
            placeholder={"select a disease"}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              this.setState({
                disease: item.value,
              })
            }
          />
        </View>
      );
    }
  };
  onSubmit(e) {
    e.preventDefault(e);
    Alert.alert(this.state.familyIs);
  }

  render() {
    console.log(this.state.selectedFor);
    return (
      <ScrollView style={Style.scrollContainer}>
        <View style={Style.container}>
          {/* <Text style={Style.myText}>INITIAL SCREENING</Text> */}
          <View>
            <Text>Is Family deserving? </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              //   formHorizontal={true}
              onPress={(value) => this.setState({ familyIs: value })}
            />
          </View>
          <View>
            <Text style={Style.label}>Family registered for</Text>

            <SelectMultiple
              items={options}
              selectedItems={this.state.selectedFor}
              onSelectionsChange={this.onSelectionsChange}
            />
          </View>
          {/*    {this.onHealth() ? (
          <View>
            <Text>disease</Text>
          </View>
        ) : (
          <View>
            <Text>no health</Text>
          </View>
        )} */}
          {this.onHealth()}
          <TextInput
            value={this.state.Remarks}
            onChangeText={(Remarks) => this.setState({ Remarks })}
            placeholder={"Remarks"}
            style={Style.input}
          ></TextInput>
          <Button
            title={"submit"}
            style={Style.submit}
            onPress={this.onSubmit.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
}
