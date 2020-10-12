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
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";

var radio_props = [
  { label: "no  ", value: 0 },
  { label: "yes", value: 1 },
];
class Tab2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Dependents: [
        {
          name: "",
          nameErr: "",
          DOB: "",
          dateErr: "",
          income: "",
          incomeErr: "",
          Relation: "",
          Education: "",
          councelling: 0,
          EducationSupport: 0,
          age: null,
        },
      ],
      DepArray: {
        name: "",
        DOB: "",
        income: "",
        Relation: "",
        Education: "",
        councelling: 0,
        EducationSupport: 0,
      },
      EducationExp: "",
      EduErr: "",
      OverallIncome: "",
      incomeErr: "",
      Rent: "",
      rentErr: "",
      Utility: "",
      utilErr: "",
      error: "",
    };
    this.onAdd = this.onAdd.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {}
  valdateDependent = () => {
    // let isvalid;
    var error = [];
    this.state.Dependents.map((item, index) => {
      if (item.name === "") {
        var data = this.state.Dependents;
        data[index].nameErr = "Dependent name is empty";
        this.setState({ Dependents: data });
        error.push("err");
      } else {
        var data = this.state.Dependents;
        data[index].nameErr = "";
        this.setState({ Dependents: data });
      }
      if (item.DOB === "") {
        var data = this.state.Dependents;
        data[index].dateErr = "date field is empty";
        this.setState({ Dependents: data });
        error.push("err");
      } else {
        var data = this.state.Dependents;
        data[index].dateErr = "";
        this.setState({ Dependents: data });
      }
      if (this.getAge(item.DOB) > 3 && item.income === "") {
        var data = this.state.Dependents;
        data[index].incomeErr = "income field is empty";
        this.setState({ Dependents: data });
        error.push("err");
      } else {
        var data = this.state.Dependents;
        data[index].incomeErr = "";
        this.setState({ Dependents: data });
      }

      /*    if (item.DOB !== "") {
        var data = this.state.Dependents;
        data[index].dateErr = "";
        this.setState({ Dependents: data });
      }
      if (item.DOB !== "") {
        var data = this.state.Dependents;
        data[index].dateErr = "";
        this.setState({ Dependents: data });
      } */

      /*   if(item.Relation===""){
        this.setState({error:"Dependent DOB is empty"});
        return false
      }
      if(item.Education===""){
        this.setState({error:"Dependent DOB is empty"});
        return false
      } */
    });
    // return isvalid.every((x) => x === true);
    return error;
  };
  validateOther = () => {
    var errors = [];
    var { EducationExp, OverallIncome, Rent, Utility } = this.state;
    if (Rent === "") {
      this.setState({ rentErr: "Rent expense empty" });
      errors.push("rent err");
    } else {
      this.setState({ rentErr: "" });
    }
    if (Utility === "") {
      this.setState({ utilErr: "Utiltiy expense empty" });
      errors.push("utility err");
    } else {
      this.setState({ utilErr: "" });
    }
    if (EducationExp === "") {
      this.setState({ EduErr: "Education expense empty" });
      errors.push("education err");
    } else {
      this.setState({ EduErr: "" });
    }
    if (OverallIncome === "") {
      this.setState({ incomeErr: "overall income empty" });
      errors.push("income err");
    } else {
      this.setState({ incomeErr: "" });
    }
    return errors;
  };

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  }
  handleOnChange = (event, index) => {
    var data = this.state.Dependents;
    data[index].name = event;
    this.setState({ Dependents: data });
  };
  handleRelChange = (value, index) => {
    var data = this.state.Dependents;
    data[index].Relation = value;
    this.setState({ Dependents: data });
    // console.log(this.state.Dependents);
  };
  onDateChange = (date, index) => {
    var data = this.state.Dependents;
    data[index].DOB = date;
    this.setState({ Dependents: data });
    // console.log(this.state.Dependents);
  };
  handleEdChange = (value, index) => {
    var data = this.state.Dependents;
    data[index].Education = value;
    this.setState({ Dependents: data });
    // console.log(this.state.Dependents);
  };
  handleCouncel = (value, index) => {
    var data = this.state.Dependents;
    data[index].councelling = value;
    this.setState({ Dependents: data });
    // console.log(this.state.Dependents);
  };
  handleEdSupport = (value, index) => {
    var data = this.state.Dependents;
    data[index].EducationSupport = value;
    this.setState({ Dependents: data });
    // console.log(this.state.Dependents);
  };
  handleIncome = (value, index) => {
    var data = this.state.Dependents;
    data[index].income = value;
    this.setState({ Dependents: data });
    // console.log(this.state.Dependents);
  };

  onAdd() {
    var data = this.state.Dependents;
    data.push(this.state.DepArray);
    this.setState({ Dependents: data });

    console.log(this.state.Dependents);
  }
  async onSubmit() {
    var isDependant = await this.valdateDependent();
    var isvalid = await this.validateOther();
    console.log(isDependant, isvalid);
    console.log(isDependant.length, isvalid.length);
    console.log(this.state);
    // console.log(this.state.Dependents);

    // await this.onAdd();
    /*  var state = this.state;
    var data = {
      dependents: state.Dependents,
      EducationExp: state.EducationExp,
      OverallIncome: state.OverallIncome,
      Rent: state.Rent,
      Utility: state.Utility,
    };
    console.log(data);
    await AsyncStorage.setItem("DependentInfo", JSON.stringify(data));
    this.props.navigation.navigate("Tab3"); */
  }

  DependentForm = () => {
    return this.state.Dependents.map((item, index) => {
      return (
        <View key={index}>
          <TextInput
            style={Style.input}
            value={item.name}
            onChangeText={(event) => {
              this.handleOnChange(event, index);
            }}
            placeholder={"Name"}
          />
          {item.nameErr ? (
            <Text style={Style.error}>{item.nameErr}</Text>
          ) : null}
          <View style={{ flexDirection: "row" }}>
            <View style={Style.picker}>
              <Picker
                selectedValue={item.Relation}
                style={Style.picker}
                onValueChange={(event) => this.handleRelChange(event, index)}
              >
                <Picker.Item label="Mother" value="Mother" />
                <Picker.Item label="Son" value="Son" />
                <Picker.Item label="Wife" value="Wife" />
                <Picker.Item label="Daughter" value="Daughter" />
                <Picker.Item label="Father" value="Father" />
                <Picker.Item label="Sister" value="Sister" />
                <Picker.Item label="Brother" value="Brother" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
          </View>

          <View style={Style.picker}>
            <Picker
              selectedValue={item.Education}
              style={Style.picker}
              onValueChange={(event) => this.handleEdChange(event, index)}
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
            date={item.DOB}
            mode="date"
            placeholder="DOB"
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
            onDateChange={(event) => this.onDateChange(event, index)}
          />
          {item.dateErr ? (
            <Text style={Style.error}>{item.dateErr}</Text>
          ) : null}
          {this.getAge(this.state.Dependents[index].DOB) > 3 ? (
            <View>
              <TextInput
                value={item.income}
                onChangeText={(event) => this.handleIncome(event, index)}
                placeholder={"Income"}
                style={Style.input}
                keyboardType={"numeric"}
              />
              {item.incomeErr ? (
                <Text style={Style.error}>{item.incomeErr}</Text>
              ) : null}
            </View>
          ) : (
            <View></View>
          )}

          <View>
            <Text>Recommended for Counselling?</Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              onPress={(event) => this.handleCouncel(event, index)}
            />
          </View>
          <View style={{ marginStart: 0 }}>
            <Text>Education Support Required?</Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              onPress={(event) => this.handleEdSupport(event, index)}
            />
          </View>
        </View>
      );
    });
  };
  render() {
    const { EduErr, rentErr, incomeErr, utilErr } = this.state;
    const income = (
      <TextInput
        value={this.state.Dependents[0].income}
        onChangeText={this.handleIncome}
        placeholder={"Income"}
        style={Style.input}
        keyboardType={"numeric"}
      />
    );
    // var age = this.getAge(this.state.Dependents[0].DOB);
    // const goodbyeMessage = <Text> Goodbye, JSX! </Text>;

    return (
      <ScrollView style={Style.scrollContainer}>
        <View style={Style.container}>
          <Text style={Style.myText}> Dependent Info</Text>
          {this.DependentForm()}
          {/* <CustomDropDown data={this.state.data} isEditable={true} /> */}

          {/*  <Button
            title={"Add"}
            style={Style.submit}
            onPress={this.onAdd.bind(this)}
          /> */}
          <TouchableOpacity
            Style={{ marginBottom: 5, marginTop: 5 }}
            onPress={this.onAdd.bind(this)}
          >
            <Icon
              style={{ marginBottom: 10 }}
              name="plus-circle"
              size={30}
              color="#999"
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}></View>

          <TextInput
            value={this.state.Rent}
            onChangeText={(Rent) => this.setState({ Rent })}
            placeholder={"Rent Expense"}
            style={Style.input}
            keyboardType={"numeric"}
          ></TextInput>
          {rentErr ? <Text style={Style.error}>{rentErr}</Text> : null}
          <TextInput
            value={this.state.Utility}
            onChangeText={(Utility) => this.setState({ Utility })}
            placeholder={"Utility Expense"}
            style={Style.input}
            keyboardType={"numeric"}
          ></TextInput>
          {utilErr ? <Text style={Style.error}>{utilErr}</Text> : null}
          <TextInput
            value={this.state.EducationExp}
            onChangeText={(EducationExp) => this.setState({ EducationExp })}
            placeholder={"Education Expense"}
            style={Style.input}
            keyboardType={"numeric"}
          ></TextInput>
          {EduErr ? <Text style={Style.error}>{EduErr}</Text> : null}
          <TextInput
            value={this.state.OverallIncome}
            onChangeText={(OverallIncome) => this.setState({ OverallIncome })}
            placeholder={"Overall Income"}
            style={Style.input}
            keyboardType={"numeric"}
          ></TextInput>
          {incomeErr ? <Text style={Style.error}>{incomeErr}</Text> : null}

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
export default Tab2;
