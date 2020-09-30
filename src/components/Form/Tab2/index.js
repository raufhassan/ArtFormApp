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
} from "react-native";
// import { RadioButton } from "react-native-paper";
import CustomDropDown from "react-native-customised-editable-picker";
import Style from "../styles";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";

var radio_props = [
  { label: "param1", value: 0 },
  { label: "param2", value: 1 },
];
class Tab2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   data: ["React", "Native", "Android", "Java", "Hello World"],
      date: "1990-05-01",
      income: null,
      counsel: "yes",
      value: 0,
    };
  }

  componentDidMount() {}

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    console.log("masla", age);

    return age;
  }

  render() {
    const income = (
      <TextInput
        value={this.state.income}
        onChangeText={(income) => this.setState({ income })}
        placeholder={"Income"}
        style={Style.input}
        keyboardType={"numeric"}
      />
    );
    var age = this.getAge(this.state.DOB);
    // const goodbyeMessage = <Text> Goodbye, JSX! </Text>;
    return (
      <>
        <View style={Style.container}>
          <Text style={Style.myText}> Dependent Info</Text>
          {/* <CustomDropDown data={this.state.data} isEditable={true} /> */}

          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.RelStatus}
              style={Style.picker}
              onValueChange={(RelStatus) =>
                this.setState({ RelStatus: RelStatus })
              }
            >
              <Picker.Item label="Below Matric" value="Below Matric" />
              <Picker.Item label="Matric" value="Matric" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Bachelors" value="Bachelors" />
              <Picker.Item label="Master" value="Masters" />
            </Picker>
          </View>
          <DatePicker
            style={Style.Date}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1990-05-01"
            maxDate="2020-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                hidden: true,
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
          <View>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {
                this.setState({ value: value });
              }}
            />
          </View>
          {/* {age > 3 ? income : <View></View>} */}
          {/*      <View>
            <RadioButton
              value="yes"
              status={checked === "yes" ? "checked" : "unchecked"}
              onPress={(value) => {
                this.setState({ counsel: value });
              }}
            />
            <RadioButton
              value="no"
              status={checked === "no" ? "checked" : "unchecked"}
              onPress={(value) => {
                this.setState({ counsel: value });
              }}
            />
          </View> */}
        </View>
      </>
    );
  }
}
export default Tab2;
