import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default Style = StyleSheet.create({
  // your styles here
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  scrollContainer: {
    // backgroundColor: "#53206a",
    // justifyContent: "center",
    flexGrow: 1,
  },
  input: {
    width: wp("80%"),
    height: hp("7%"),
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 4,
  },
  linkstyle: {
    marginTop: 10,
    color: "#fff",
  },
  head: {
    color: "#fff",
    fontWeight: "400",
    fontSize: hp("8%"),
    marginBottom: 10,
  },
  picker: {
    borderBottomColor: "black",
    width: wp("80%"),
    height: hp("7%"),
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 4,
  },
  myText: { fontSize: hp("5%"), marginBottom: 10 },
  Date: {
    width: wp("80%"),
    height: hp("7%"),
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  submit: {
    color: "#fff",
    marginBottom: 10,
    backgroundColor: "#000",
    paddingBottom: 20,
  },
  images: {
    width: 150,
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 3,
  },
  imagebtn: {
    backgroundColor: "grey",
    color: "white",
    padding: 10,
    marginBottom: 10,
  },
  ImageSections: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
  },
});
