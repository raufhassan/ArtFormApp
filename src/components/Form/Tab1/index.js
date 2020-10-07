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
import { openDatabase } from "react-native-sqlite-storage";
import Style from "../styles";
// import DatePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";
// import ValidationComponent from "react-native-form-validator";
var db = openDatabase({ name: "UserDatabase.db" });

var radio_props = [
  { label: "no  ", value: 0 },
  { label: "yes", value: 1 },
];

export default class Tab1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      Religion: "Islam",
      date: "",
      RelStatus: "",
      cell: "",
      Address: "",
      Town: "Surjani",
      Area: "",
      profession: "",
      empStatus: "Employed",
      MonthlyIncome: 0,
      skills: "",
      zakat: 0,
      gender: "male",
      guardian: "",
      filepath: {
        data: "",
        uri: "",
      },
      fileData: "",
      fileUri: "",
      error: "",
    };
  }

  validate = () => {
    var reg = /^((\+92))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    const {
      first_name,
      last_name,
      date,
      Address,
      Area,
      cell,
      fileUri,
      guardian,
    } = this.state;
    if (first_name === "" || last_name === "") {
      this.setState({ error: "name field is empty" });
      return false;
    }
    if (first_name.length < 3) {
      this.setState({ error: "name field must be greater than 2 words " });
      return false;
    }
    if (date === "") {
      this.setState({ error: "date field is empty" });
      return false;
    }
    if (Address === "") {
      this.setState({ error: "Address field is empty" });
      return false;
    }
    if (Address.length < 7) {
      this.setState({ error: "Address must be greater than 7 words" });
      return false;
    }
    if (Area === "") {
      this.setState({ error: "Area field is empty" });
      return false;
    }
    if (fileUri === "") {
      this.setState({ error: "Cnic image not uploaded" });
      return false;
    }
    if (guardian === "") {
      this.setState({ error: "Guardian field is empty" });
      return false;
    }
    if (cell !== "") {
      return reg.test(this.state.cell);
    }
    return true;
  };

  async componentDidMount() {
    try {
      const retrievedItem = await AsyncStorage.getItem("Personal");
      const item = JSON.parse(retrievedItem);
      console.log("data of async", item);
    } catch (error) {
      console.log(error.message);
    }
  }
  async onSubmit(e) {
    e.preventDefault();

    var state = this.state;
    console.log(state.fileUri);
    var isValid = this.validate();
    e.preventDefault();
    if (isValid) {
      let personalInfo = {
        first_name: state.first_name,
        last_name: state.last_name,
        Religion: state.Religion,
        date: state.date,
        RelStatus: state.RelStatus,
        cell: state.cell,
        profession: state.profession,
        empStatus: state.empStatus,
        MonthlyIncome: state.MonthlyIncome,
        skills: state.skills,
        cnic: state.fileUri,
      };
      console.log(personalInfo);
      await AsyncStorage.setItem("Personal", JSON.stringify(personalInfo));
      this.props.navigation.navigate("Tab2");
    } else {
      Alert.alert(this.state.error);
    }
  }
  chooseImage = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        // console.log("response", JSON.stringify(response));
        console.log(source);
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };
  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        // console.log("response", JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return (
        <Image source={{ uri: this.state.fileUri }} style={Style.images} />
      );
    } else {
      return null;
      /*  <Image
          source={require("../../../../assets/images/image1.jpg")}
          style={Style.images}
        /> */
    }
  }

  render() {
    const father = (
      <TextInput
        value={this.state.guardian}
        onChangeText={(guardian) => this.setState({ guardian })}
        placeholder={"S/o"}
        style={Style.input}
      />
    );
    const husband = (
      <TextInput
        value={this.state.guardian}
        onChangeText={(guardian) => this.setState({ guardian })}
        placeholder={"W/o , D/o "}
        style={Style.input}
      />
    );
    return (
      <ScrollView style={Style.scrollContainer}>
        <View style={Style.container}>
          <Text style={Style.myText}> Personal Info</Text>
          <TextInput
            value={this.state.first_name}
            onChangeText={(first_name) => this.setState({ first_name })}
            placeholder={"First name"}
            style={Style.input}
          ></TextInput>
          <TextInput
            value={this.state.last_name}
            onChangeText={(last_name) => this.setState({ last_name })}
            placeholder={"Last name"}
            placeholderTextColor="#000"
            style={Style.input}
          ></TextInput>
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.gender}
              style={Style.picker}
              onValueChange={(gender) => this.setState({ gender: gender })}
            >
              <Picker.Item label="male" value="male" />
              <Picker.Item label="female" value="female" />
            </Picker>
          </View>
          {this.state.gender === "male" ? father : husband}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.Religion}
              style={Style.picker}
              onValueChange={(value) => {
                if (value == -1) {
                  this.setState({ Religion: "" });
                } else {
                  this.setState({ Religion: value });
                }
              }}
            >
              <Picker.Item label="select relegion" value="-1" />
              <Picker.Item label="Islam" value="Islam" />
              <Picker.Item label="Chritianity" value="Chritianity" />
              <Picker.Item label="Hinduism" value="Hinduism" />
              <Picker.Item label="jew" value="jew" />
              <Picker.Item label="other" value="other" />
            </Picker>
          </View>
          {this.state.Religion === "Islam" ? (
            <View>
              <Text>Eligible for zakat?</Text>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                onPress={(event) => this.setState({ zakat: event })}
              />
            </View>
          ) : (
            <View></View>
          )}

          <DatePicker
            style={Style.Date}
            date={this.state.date}
            mode="date"
            placeholder="DOB"
            format="YYYY-MM-DD"
            minDate="1980-05-01"
            maxDate="2005-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
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
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.RelStatus}
              style={Style.picker}
              onValueChange={(RelStatus) =>
                this.setState({ RelStatus: RelStatus })
              }
            >
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="Married" value="Married" />
              <Picker.Item label="Widow" value="Widow" />
              <Picker.Item label="Widower" value="Widower" />
              <Picker.Item label="Seperated" value="Seperated" />
            </Picker>
          </View>
          <TextInput
            value={this.state.cell}
            onChangeText={(cell) => this.setState({ cell })}
            placeholder={"Contact"}
            keyboardType={"numeric"}
            style={Style.input}
          ></TextInput>
          <TextInput
            value={this.state.Address}
            onChangeText={(Address) => this.setState({ Address })}
            placeholder={"Address"}
            style={Style.input}
          ></TextInput>
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.Town}
              style={Style.picker}
              onValueChange={(Town) => this.setState({ Town: Town })}
            >
              <Picker.Item label="Surjani" value="Surjani" />
              <Picker.Item label="North karachi" value="North karachi" />
              <Picker.Item label="New Karachi" value="New Karachi" />
              <Picker.Item label="Korangi" value="Korangi" />
              <Picker.Item label="others" value="others" />
            </Picker>
          </View>
          <TextInput
            value={this.state.Area}
            onChangeText={(Area) => this.setState({ Area })}
            placeholder={"Area"}
            style={Style.input}
          ></TextInput>

          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.profession}
              style={Style.picker}
              onValueChange={(profession) =>
                this.setState({ profession: profession })
              }
            >
              <Picker.Item label="Driver" value="Driver" />
              <Picker.Item label="Maid" value="Maid" />
              <Picker.Item label="Labor/Daily wage worker" value="Labor" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>

          <View style={Style.picker}>
            <Picker
              itemStyle={{ color: "blue" }}
              selectedValue={this.state.empStatus}
              onValueChange={(empStatus) =>
                this.setState({ empStatus: empStatus })
              }
            >
              <Picker.Item label="Employed" value="Employed" />
              <Picker.Item label="Unemployed" value="Unemployed" />
              <Picker.Item label="self-employed" value="Self-employed" />
            </Picker>
          </View>
          <TextInput
            value={this.state.MonthlyIncome}
            onChangeText={(MonthlyIncome) => this.setState({ MonthlyIncome })}
            placeholder={"Monthly Income"}
            style={Style.input}
            keyboardType={"numeric"}
          ></TextInput>
          <TextInput
            value={this.state.skills}
            onChangeText={(skills) => this.setState({ skills })}
            placeholder={"Hands on Skills"}
            style={Style.input}
          ></TextInput>
          <TouchableOpacity onPress={this.chooseImage} style={Style.imagebtn}>
            <Text style={{ color: "white" }}>Cnic Image</Text>
          </TouchableOpacity>
          <View style={Style.ImageSections}>
            <View>
              {this.renderFileUri()}
              <Text style={{ textAlign: "center" }}>File Uri</Text>
            </View>
          </View>

          <Button
            title={"submit"}
            style={Style.submit}
            onPress={this.onSubmit.bind(this)}
          />
          <Text></Text>
        </View>
      </ScrollView>
    );
  }
}
