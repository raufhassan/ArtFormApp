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
  SafeAreaView,
} from "react-native";
import Style from "../styles";
import RadioForm from "react-native-simple-radio-button";
import SelectMultiple from "react-native-select-multiple";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-crop-picker";

const options = ["Ration", "Education ", "Small Business Support", "Health"];

var radio_props = [
  { label: "Most deserving", value: "Most deserving" },
  { label: "deserving ", value: "deserving" },
  { label: "Not deserving ", value: "Not deserving" },
  { label: "Temporarily relief ", value: "Temporarily relief" },
];

export default class Tab3 extends Component {
  constructor(props) {
    super(props);
    const data = this.props.info;
    if (data) {
      this.state = {
        familyIs: data.familyIs,
        selectedFor: ["Ration"],
        typeErr: "",
        disease: data.disease,
        diseaseErr: "",
        Remarks: data.Remarks,
        RemarksErr: "",
        imagesUri: data.imagesUri,
        imageErr: "",
      };
    } else {
      this.state = {
        familyIs: "",
        selectedFor: [],
        typeErr: "",
        disease: "",
        diseaseErr: "",
        Remarks: "",
        RemarksErr: "",
        imagesUri: [],
        imageErr: "",
      };
    }
  }
  onSelectionsChange = (value) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFor: value });
  };
  async componentDidMount() {
    /* try {
      const retrievedItem = await AsyncStorage.getItem("DependentInfo");
      const item = JSON.parse(retrievedItem);
      console.log("data of async", item);
    } catch (error) {
      console.log(error.message);
    } */
  }
  validate = () => {
    var errors = [];
    const { selectedFor, disease, Remarks, imagesUri } = this.state;
    var count = 0;
    this.state.selectedFor.map((item) => {
      if (item === "Health") {
        count = count + 1;
      }
    });
    if (selectedFor.length === 0) {
      this.setState({ typeErr: "please select atleast one option" });
      errors.push("type error");
    } else {
      this.setState({ typeErr: "" });
    }
    if (count === 1 && disease === "") {
      this.setState({ diseaseErr: "please select disease" });
      errors.push("disease error");
    } else {
      this.setState({ diseaseErr: "" });
    }
    if (Remarks === "") {
      this.setState({ RemarksErr: "Remarks field empty" });
      errors.push("remark error");
    } else {
      this.setState({ RemarksErr: "" });
    }
    if (imagesUri.length === 0) {
      this.setState({ imageErr: "please upload images" });
      errors.push("images error");
    } else {
      this.setState({ imageErr: "" });
    }
    return errors;
  };
  OpenLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 5,
      compressImageQuality: 0.8,
      mediaType: "photo",
    }).then((images) => {
      console.log(images);

      const uri = images.map((el, index) => {
        // console.log("recieved image", el);
        //  uri[index] = el.path;
        return el.path;
      });
      console.log(uri);
      this.setState({ imagesUri: uri });
    });
  };
  renderImage = (image) => {
    return (
      <Image
        style={{
          width: 185,
          height: 128,
          backgroundColor: "#fff",
          marginTop: 1,
          resizeMode: "contain",
        }}
        source={{ uri: image }}
      />
    );
  };
  onHealth = () => {
    var count = 0;
    this.state.selectedFor.map((item) => {
      if (item === "Health") {
        count = count + 1;
      }
    });
    console.log(count);
    if (count == 1) {
      return (
        <>
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
          {this.state.diseaseErr ? (
            <Text style={Style.error}>{this.state.diseaseErr}</Text>
          ) : null}
        </>
      );
    }
  };
  onSubmit() {
    console.log(this.state);
    // e.preventDefault(e);
    var isValid = this.validate();
    console.log(isValid);
    console.log(isValid.length);
    if (isValid.length === 0) {
      const remarks = {
        familyIs: this.state.familyIs,
        selectedFor: this.state.selectedFor,
        disease: this.state.disease,
        Remarks: this.state.Remarks,
        imagesUri: this.state.imagesUri,
      };
      this.props.Remarks(remarks);
    }
  }

  render() {
    /*   console.log("state variable", this.state.selectedFor);
    console.log(this.state.imagesUri); */
    const { RemarksErr, typeErr, imageErr } = this.state;
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

            {/* <SelectMultiple
              items={options}
              selectedItems={this.state.selectedFor}
              onSelectionsChange={(value) => this.onSelectionsChange(value)}
            /> */}
            <View style={{ marginVertical: 10 }}>
              <DropDownPicker
                items={[
                  {
                    label: "Ration",
                    value: "Ration",
                  },
                  {
                    label: "Education",
                    value: "Education",
                  },
                  {
                    label: "Small Business support",
                    value: "business",
                  },
                  {
                    label: "Health",
                    value: "Health",
                  },
                ]}
                multiple={true}
                multipleText="%d items have been selected."
                placeholder={"select registration type"}
                min={0}
                max={10}
                defaultValue={this.state.selectedFor}
                containerStyle={{ height: 40 }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                onChangeItem={(item) =>
                  this.setState({
                    selectedFor: item, // an array of the selected items
                  })
                }
              />
            </View>
          </View>
          {typeErr ? <Text style={Style.error}>{typeErr}</Text> : null}

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
          {RemarksErr ? <Text style={Style.error}>{RemarksErr}</Text> : null}
          <TouchableOpacity style={Style.upload} onPress={this.OpenLibrary}>
            <Text style={{ color: "#fff" }}>upload images</Text>
          </TouchableOpacity>
          {imageErr ? <Text style={Style.error}>{imageErr}</Text> : null}
          <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {this.state.imagesUri
                ? this.state.imagesUri.map((el, index) => {
                    console.log(el);
                    return (
                      <View
                        style={
                          {
                            // width: 185, height: 128,
                            //  width:'50%',
                            // flexBasis: "33.33%",
                          }
                        }
                        key={index}
                      >
                        {this.renderImage(el)}
                      </View>
                    );
                  })
                : null}
            </View>
          </ScrollView>
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
