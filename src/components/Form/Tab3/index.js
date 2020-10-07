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
import ImagePicker from "react-native-image-crop-picker";

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
      imagesUri: [],
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
    /*   console.log("state variable", this.state.selectedFor);
    console.log(this.state.imagesUri); */
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
          <TouchableOpacity style={Style.upload} onPress={this.OpenLibrary}>
            <Text style={{ color: "#fff" }}>upload images</Text>
          </TouchableOpacity>
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
