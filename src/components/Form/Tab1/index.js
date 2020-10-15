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
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";
import { Husband } from "./husband";
// import MainFirst from "./Main";
// import ValidationComponent from "react-native-form-validator";

var radio_props = [
  { label: "no  ", value: 0 },
  { label: "yes", value: 1 },
];

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    const data = this.props.info;
    if (data) {
      this.state = {
        first_name: data.first_name,
        fnameErr: "",
        last_name: data.last_name,
        lnameErr: "",
        Religion: data.Religion,
        ReligionErr: "",
        date: data.date,
        dateErr: "",
        RelStatus: data.RelStatus,
        RelErr: "",
        cell: data.cell,
        cellErr: "",
        Address: data.Address,
        AddressErr: "",
        Town: data.Town,
        TownErr: "",
        Area: data.Area,
        AreaErr: "",
        profession: data.profession,
        professionErr: "",
        empStatus: data.empStatus,
        empStatusErr: "",
        MonthlyIncome: data.MonthlyIncome,
        incomeErr: "",
        skills: data.skills,
        zakat: data.zakat,
        gender: data.gender,
        HbState: "",
        HbStateErr: "",
        Hbprofession: "",
        HbprofessionErr: "",
        Hbincome: "",
        HbincomeErr: "",
        HbUnemp: "",
        HbUnempErr: "",
        Hbcompany: "",
        HbReason: "",
        HbReasonErr: "",
        genderErr: "",
        guardian: data.guardian,
        guardianErr: "",
        filepath: {
          data: "",
          uri: "",
        },
        fileData: "",
        fileUri: data.cnic,
        cnicErr: "",
      };
    } else {
      this.state = {
        first_name: "",
        fnameErr: "",
        last_name: "",
        lnameErr: "",
        Religion: "",
        ReligionErr: "",
        date: "",
        dateErr: "",
        RelStatus: "",
        RelErr: "",
        cell: "",
        cellErr: "",
        Address: "",
        AddressErr: "",
        Town: "",
        TownErr: "",
        Area: "",
        AreaErr: "",
        profession: "",
        professionErr: "",
        empStatus: "",
        empStatusErr: "",
        MonthlyIncome: "",
        incomeErr: "",
        skills: "",
        zakat: 0,
        gender: "",
        HbState: "",
        HbStateErr: "",
        Hbprofession: "",
        HbprofessionErr: "",
        Hbincome: "",
        HbincomeErr: "",
        HbUnemp: "",
        HbUnempErr: "",
        Hbcompany: "",
        HbReason: "",
        HbReasonErr: "",
        genderErr: "",
        husbandState: "",
        guardian: "",
        guardianErr: "",
        filepath: {
          data: "",
          uri: "",
        },
        fileData: "",
        fileUri: "",
        cnicErr: "",
      };
    }
  }

  validate = () => {
    var reg = /^((\+92))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    var errors = [];
    const {
      first_name,
      last_name,
      date,
      Address,
      Area,
      Town,
      cell,
      fileUri,
      guardian,
      Religion,
      RelStatus,
      profession,
      empStatus,
      MonthlyIncome,
      gender,
      HbState,
      Hbprofession,
      Hbincome,
      HbUnemp,
      HbReason,
    } = this.state;
    if (first_name !== "") {
      if (first_name.length < 3) {
        this.setState({ fnameErr: "name field must be greater than 2 words" });
        errors.push("fname error");
      } else {
        this.setState({ fnameErr: "" });
      }
    } else {
      this.setState({ fnameErr: "first name field is empty" });
      errors.push("fname error");
    }

    if (last_name === "") {
      this.setState({ lnameErr: "name field is empty" });
      errors.push("lname error");
    } else {
      this.setState({ lnameErr: "" });
    }
    if (gender === "") {
      this.setState({ genderErr: "please select gender" });
      errors.push("gender error");
    } else {
      this.setState({ genderErr: "" });
    }
    if (guardian === "") {
      this.setState({ guardianErr: "Guardian field is empty" });
      errors.push("guardian error");
    } else {
      this.setState({ guardianErr: "" });
    }
    if (Religion === "") {
      this.setState({ ReligionErr: "please select Religion" });
      errors.push("relegi error");
    } else {
      this.setState({ ReligionErr: "" });
    }
    if (date === "") {
      this.setState({ dateErr: "date field is empty" });
      errors.push("datr error");
    } else {
      this.setState({ dateErr: "" });
    }
    if (RelStatus === "") {
      this.setState({ RelErr: "please select relationship status" });
      errors.push("rel error");
    } else {
      this.setState({ RelErr: "" });
    }
    if (cell !== "") {
      var result = reg.test(this.state.cell);
      if (!result) {
        this.setState({ cellErr: "contact number is invalid" });
        errors.push("phon error");
      } else {
        this.setState({ cellErr: "" });
      }
    } else {
      this.setState({ cellErr: "contact no feild is empty" });
      errors.push("phone error");
    }
    if (Address !== "") {
      if (Address.length < 7) {
        this.setState({ AddressErr: "Address must be greater than 7 words" });
        errors.push("addres error");
      } else {
        this.setState({ AddressErr: "" });
      }
    } else {
      this.setState({ AddressErr: "Addrees is empty" });
      errors.push("addres error");
    }
    if (Town === "") {
      this.setState({ TownErr: "please select town" });
      errors.push("town error");
    } else {
      this.setState({ TownErr: "" });
    }
    if (Area === "") {
      this.setState({ AreaErr: "Area field is empty" });
      errors.push("area error");
    } else {
      this.setState({ AreaErr: "" });
    }
    if (profession === "") {
      this.setState({ professionErr: "Please select Profession" });
      errors.push("professsio error");
    } else {
      this.setState({ professionErr: "" });
    }
    if (empStatus === "") {
      this.setState({ empStatusErr: "Please select employment status" });
      errors.push("empsta error");
    } else {
      this.setState({ empStatusErr: "" });
    }

    if (MonthlyIncome == "") {
      this.setState({ incomeErr: "income field is empty" });
      errors.push("incon error");
    } else {
      this.setState({ incomeErr: "" });
    }
    if (fileUri === "") {
      this.setState({ cnicErr: "Cnic image not uploaded" });
      errors.push("imageerror");
    } else {
      this.setState({ cnicErr: "" });
    }
    if (gender === "female" && RelStatus === "Married") {
      if (HbState === "") {
        this.setState({
          HbStateErr: "Husband employement status field is empty",
        });
        errors.push("error");
      } else {
        this.setState({ HbStateErr: "" });
      }
    }
    if (HbState === "Employed" && Hbincome === "") {
      this.setState({ HbincomeErr: "husbands income empty" });
      errors.push("income err");
    } else {
      this.setState({ HbincomeErr: "" });
    }
    if (HbState === "Employed" && Hbprofession === "") {
      this.setState({ HbprofessionErr: "husbands profession is empty" });
      errors.push("profession err");
    } else {
      this.setState({ HbprofessionErr: "" });
    }
    if (HbState === "Unemployed" && HbUnemp === "") {
      this.setState({ HbUnempErr: "unemployement type is empty" });
      errors.push("unemp err");
    } else {
      this.setState({ HbUnempErr: "" });
    }
    if (HbUnemp === "Permenant" && Hbprofession === "") {
      this.setState({ HbprofessionErr: "husbands profession is empty" });
      errors.push("unemp err");
    } else {
      this.setState({ HbprofessionErr: "" });
    }
    if (HbUnemp === "Temporary" && HbReason === "") {
      this.setState({ HbReasonErr: "Unemployement reason is empty is empty" });
      errors.push("unemp err");
    } else {
      this.setState({ HbReasonErr: "" });
    }

    return errors;
  };

  async componentDidMount() {
    /*  try {
      const retrievedItem = await AsyncStorage.getItem("id");
      const item = JSON.parse(retrievedItem);
      console.log("data of async", item);
    } catch (error) {
      console.log(error.message);
    } */
  }
  async onSubmit() {
    // e.preventDefault();
    var state = this.state;
    // console.log(state.fileUri);
    var isValid = await this.validate();
    /*   console.log(isValid.length);
    console.log(isValid);
    console.log(typeof isValid.length);
    if (isValid.length === 0) {
      console.log("no error");
    } else {
      console.log("exist");
    } */
    if (isValid.length === 0) {
      let personalInfo = {
        first_name: state.first_name,
        last_name: state.last_name,
        Religion: state.Religion,
        zakat: state.zakat,
        gender: state.gender,
        guardian: state.guardian,
        date: state.date,
        RelStatus: state.RelStatus,
        cell: state.cell,
        Address: state.Address,
        Town: state.Town,
        Area: state.Area,
        profession: state.profession,
        empStatus: state.empStatus,
        MonthlyIncome: state.MonthlyIncome,
        skills: state.skills,
        cnic: state.fileUri,
      };
      console.log(personalInfo);
      // await AsyncStorage.setItem("Personal", JSON.stringify(personalInfo));
      // this.props.navigation.navigate("Tab2");
      this.props.personalInfo(personalInfo);
    } else {
      console.log(isValid);
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
  onStatusChange = (value) => {
    if (value === "-1") {
      this.setState({ HbState: "" });
    } else {
      this.setState({ HbState: value });
    }
  };
  onProfessionChange = (value) => {
    this.setState({ Hbprofession: value });
  };
  onIncomeChange = (value) => {
    this.setState({ Hbincome: value });
  };
  onCompanyChange = (value) => {
    this.setState({ Hbcompany: value });
  };
  onReasonChange = (value) => {
    this.setState({ HbReason: value });
  };
  onUnEmpChange = (value) => {
    this.setState({ HbUnemp: value });
  };

  render() {
    /* if (this.props.info) {
      console.log("data", this.props.info);
    } */
    console.log(this.state);
    var {
      fnameErr,
      lnameErr,
      genderErr,
      guardianErr,
      ReligionErr,
      RelErr,
      dateErr,
      cellErr,
      AddressErr,
      AreaErr,
      TownErr,
      empStatusErr,
      incomeErr,
      professionErr,
      cnicErr,
    } = this.state;

    var { gender, RelStatus } = this.state;
    let input, husbandStatus;
    /*  let isFocused = this.props.navigation.isFocused();
    console.log("tab1", isFocused); */
    if (gender === "female" && RelStatus === "Married") {
      husbandStatus = (
        <Husband
          data={this.state}
          husbandState={this.state.HbState}
          company={this.state.Hbcompany}
          income={this.state.Hbincome}
          profession={this.state.Hbprofession}
          reason={this.state.HbReason}
          onStatusChange={this.onStatusChange}
          onProfessionChange={this.onProfessionChange}
          onIncomeChange={this.onIncomeChange}
          onCompanyChange={this.onCompanyChange}
          onReasonChange={this.onReasonChange}
          onUnEmpChange={this.onUnEmpChange}
        />
      );
    }

    const father = (
      <View>
        <TextInput
          value={this.state.guardian}
          onChangeText={(guardian) => this.setState({ guardian })}
          placeholder={"S/o"}
          style={Style.input}
        />
        {guardianErr ? <Text style={Style.error}>{guardianErr}</Text> : null}
      </View>
    );
    const husband = (
      <View>
        <TextInput
          value={this.state.guardian}
          onChangeText={(guardian) => this.setState({ guardian })}
          placeholder={"W/o , D/o "}
          style={Style.input}
        />
        {guardianErr ? <Text style={Style.error}>{guardianErr}</Text> : null}
      </View>
    );
    if (gender === "male") {
      input = father;
    } else if (gender === "female") {
      input = husband;
    } else {
      input = null;
    }
    return (
      // <MainFirst>
      <ScrollView style={Style.scrollContainer}>
        <View style={Style.container}>
          <Text style={Style.myText}> Personal Info</Text>
          <TextInput
            value={this.state.first_name}
            onChangeText={(first_name) => this.setState({ first_name })}
            placeholder={"First name"}
            style={Style.input}
          ></TextInput>
          {fnameErr ? <Text style={Style.error}>{fnameErr}</Text> : null}
          <TextInput
            value={this.state.last_name}
            onChangeText={(last_name) => this.setState({ last_name })}
            placeholder={"Last name"}
            style={Style.input}
          ></TextInput>
          {lnameErr ? <Text style={Style.error}>{lnameErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.gender}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === "-1") {
                  this.setState({ gender: "" });
                } else {
                  this.setState({ gender: value });
                }
              }}
            >
              <Picker.Item label="select gender" value="-1" />
              <Picker.Item label="male" value="male" />
              <Picker.Item label="female" value="female" />
            </Picker>
            {/*        <DropDownPicker
              items={[
                { label: "male", value: "male" },
                { label: "female", value: "female" },
              ]}
              defaultValue={this.state.gender}
              containerStyle={{ height: 40 }}
              style={Style.Dropdown}
              placeholder={"select gender"}
              itemStyle={{
                justifyContent: "flex-start",
                color: "red",
              }}
              activeItemStyle={{ color: "red" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.setState({
                  gender: item.value,
                })
              }
            /> */}
            {genderErr ? <Text style={Style.error}>{genderErr}</Text> : null}
          </View>
          {/* {this.state.gender === "male" ? father : husband} */}
          {input}

          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.Religion}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === " -1") {
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
          {/*       <DropDownPicker
            items={[
              { label: "Islam", value: "Islam" },
              { label: "Christianity", value: "Christianity" },
              { label: "Hinduism", value: "Hinduism" },
              { label: "jew", value: "jew" },
              { label: "other", value: "other" },
            ]}
            defaultValue={this.state.Religion}
            containerStyle={{ height: 40 }}
            style={Style.Dropdown}
            placeholder={"select Religion"}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              this.setState({
                Religion: item.value,
              })
            }
          /> */}
          {ReligionErr ? <Text style={Style.error}>{ReligionErr}</Text> : null}
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
          {dateErr ? <Text style={Style.error}>{dateErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.RelStatus}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === " -1") {
                  this.setState({ RelStatus: "" });
                } else {
                  this.setState({ RelStatus: value });
                }
              }}
            >
              <Picker.Item label="Relationship status" value="-1" />
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="Married" value="Married" />
              <Picker.Item label="Widow" value="Widow" />
              <Picker.Item label="Widower" value="Widower" />
              <Picker.Item label="Seperated" value="Seperated" />
            </Picker>
          </View>
          {husbandStatus}
          {/*   <View style={{ marginBottom: 10 }}>
            <DropDownPicker
              items={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
                { label: "Widow", value: "Widow" },
                { label: "Widower", value: "Widower" },
                { label: "Seperated", value: "Seperated" },
              ]}
              defaultValue={this.state.RelStatus}
              containerStyle={{ height: 40 }}
              style={Style.Dropdown}
              placeholder={"select Relationship status"}
            

              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.setState({
                  RelStatus: item.value,
                })
              }
            />
          </View> */}
          {RelErr ? <Text style={Style.error}>{RelErr}</Text> : null}
          <TextInput
            value={this.state.cell}
            onChangeText={(cell) => this.setState({ cell })}
            placeholder={"Contact"}
            keyboardType={"numeric"}
            style={Style.input}
          ></TextInput>
          {cellErr ? <Text style={Style.error}>{cellErr}</Text> : null}
          <TextInput
            value={this.state.Address}
            onChangeText={(Address) => this.setState({ Address })}
            placeholder={"Address"}
            style={Style.input}
          ></TextInput>
          {AddressErr ? <Text style={Style.error}>{AddressErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.Town}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === "-1") {
                  this.setState({ Town: "" });
                } else {
                  this.setState({ Town: value });
                }
              }}
            >
              <Picker.Item label="select town" value="-1" />
              <Picker.Item label="Surjani" value="Surjani" />
              <Picker.Item label="North karachi" value="North karachi" />
              <Picker.Item label="New Karachi" value="New Karachi" />
              <Picker.Item label="Korangi" value="Korangi" />
              <Picker.Item label="others" value="others" />
            </Picker>
          </View>
          {/*  <View style={{ marginBottom: 10 }}>
            <DropDownPicker
              items={[
                { label: "Surjani", value: "Surjani" },
                { label: "North karachi", value: "North karachi" },
                { label: "New Karachi", value: "New Karachi" },
                { label: "Korangi", value: "Korangi" },
                { label: "others", value: "others" },
              ]}
              defaultValue={this.state.Town}
              containerStyle={{ height: 40 }}
              style={Style.Dropdown}
              placeholder={"select Town"}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.setState({
                  Town: item.value,
                })
              }
            />
          </View> */}
          {TownErr ? <Text style={Style.error}>{TownErr}</Text> : null}
          <TextInput
            value={this.state.Area}
            onChangeText={(Area) => this.setState({ Area })}
            placeholder={"Area"}
            style={Style.input}
          ></TextInput>
          {AreaErr ? <Text style={Style.error}>{AreaErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.profession}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === "-1") {
                  this.setState({ profession: "" });
                } else {
                  this.setState({ profession: value });
                }
              }}
            >
              <Picker.Item label="Profession" value="-1" />
              <Picker.Item label="Driver" value="Driver" />
              <Picker.Item label="Maid" value="Maid" />
              <Picker.Item label="Labor/Daily wage worker" value="Labor" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>
          {/* <View style={{ marginBottom: 10 }}>
            <DropDownPicker
              items={[
                { label: "Driver", value: "Driver" },
                { label: "Maid", value: "Maid" },
                { label: "New Karachi", value: "New Karachi" },
                { label: "Labor/Daily wage worker", value: "Labor" },
                { label: "Others", value: "others" },
              ]}
              defaultValue={this.state.profession}
              containerStyle={{ height: 40 }}
              style={Style.Dropdown}
              placeholder={"select Profession"}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.setState({
                  profession: item.value,
                })
              }
            />
          </View> */}
          {professionErr ? (
            <Text style={Style.error}>{professionErr}</Text>
          ) : null}
          <View style={Style.picker}>
            <Picker
              itemStyle={{ color: "blue" }}
              selectedValue={this.state.empStatus}
              onValueChange={(value) => {
                if (value === "-1") {
                  this.setState({ empStatus: "" });
                } else {
                  this.setState({ empStatus: value });
                }
              }}
            >
              <Picker.Item label="Employment status" value="-1" />
              <Picker.Item label="Employed" value="Employed" />
              <Picker.Item label="Unemployed" value="Unemployed" />
              <Picker.Item label="self-employed" value="Self-employed" />
            </Picker>
          </View>
          {/*  <View style={{ marginBottom: 10 }}>
            <DropDownPicker
              items={[
                { label: "Employed", value: "Employed" },
                { label: "Unemployed", value: "Unemployed" },
                { label: "self-employed", value: "self-employed" },
              ]}
              defaultValue={this.state.empStatus}
              containerStyle={{ height: 40 }}
              style={Style.Dropdown}
              placeholder={"Select Employement status"}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.setState({
                  empStatus: item.value,
                })
              }
            />
          </View> */}
          {empStatusErr ? (
            <Text style={Style.error}>{empStatusErr}</Text>
          ) : null}
          <TextInput
            value={this.state.MonthlyIncome}
            onChangeText={(MonthlyIncome) => this.setState({ MonthlyIncome })}
            placeholder={"Monthly Income"}
            style={Style.input}
            keyboardType={"numeric"}
          ></TextInput>
          {incomeErr ? <Text style={Style.error}>{incomeErr}</Text> : null}
          <TextInput
            value={this.state.skills}
            onChangeText={(skills) => this.setState({ skills })}
            placeholder={"Hands on Skills"}
            style={Style.input}
          ></TextInput>

          <TouchableOpacity onPress={this.chooseImage} style={Style.imagebtn}>
            <Text style={{ color: "white" }}>Cnic Image</Text>
          </TouchableOpacity>
          {cnicErr ? <Text style={Style.error}>{cnicErr}</Text> : null}
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
      // </MainFirst>
    );
  }
}
