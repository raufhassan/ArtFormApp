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

import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";

var db = openDatabase({ name: "UserDatabase.db" });

export default class Tab1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      Religion: "",
      date: "",
      RelStatus: "",
      cell: "",
      profession: "",
      empStatus: "",
      MonthlyIncome: 0,
      skills: "",
      gender: "male",
      guardian: "",
      filepath: {
        data: "",
        uri: "",
      },
      fileData: "",
      fileUri: "",
    };

    /*     db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_email VARCHAR(20))",
              []
            );
          }
        }
      );
    }); */
  }
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
    var state = this.state;
    console.log(state.fileUri);
    e.preventDefault();
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
        console.log("response", JSON.stringify(response));
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
        console.log("response", JSON.stringify(response));
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
      return (
        <Image
          source={require("../../../../assets/images/image1.jpg")}
          style={Style.images}
        />
      );
    }
  }
  InsertDBAction = () => {
    console.log("insertDB Called");
    if (this.state.user_name) {
      if (this.state.user_contact) {
        if (this.state.user_email) {
          db.transaction((tx) => {
            // Loop would be here in case of many values

            tx.executeSql(
              "INSERT INTO table_user (user_id, user_name, user_contact, user_email) VALUES (?,?,?,?)",
              [
                this.state.input_user_id,
                this.state.user_name,
                this.state.user_contact,
                this.state.user_email,
              ],
              (tx, results) => {
                console.log("Insert Results", results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    "Success",
                    "User updated successfully",
                    [
                      {
                        text: "Ok",
                        onPress: () => that.props.navigation.navigate("Home"),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert("Updation Failed");
                }
              }
            );
          });
        } else {
          alert("Please fill Address");
        }
      } else {
        alert("Please fill Contact Number");
      }
    } else {
      alert("Please fill Name");
    }
  };

  render() {
    const father = (
      <TextInput
        value={this.state.guardian}
        onChangeText={this.handleIncome}
        placeholder={"S/o"}
        style={Style.input}
        keyboardType={"numeric"}
      />
    );
    const husband = (
      <TextInput
        value={this.state.guardian}
        onChangeText={this.handleIncome}
        placeholder={"W/o , D/o "}
        style={Style.input}
        keyboardType={"numeric"}
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

          {/*       <TouchableOpacity
          onPress={() => this.InsertDBAction()}
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: "#E8590A",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
          }}
        >
          <Text> Insert into Database </Text>
        </TouchableOpacity> */}
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
