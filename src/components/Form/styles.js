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
    justifyContent: "center",
    alignItems: "center",
    // padding: hp(7),
    paddingVertical: 30,
  },
  scrollContainer: {
    // backgroundColor: "#53206a",
    // justifyContent: "center",
    flex: 1,
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
  center: {
    width: wp("80%"),
    alignItems: "flex-start",
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
    backgroundColor: "#fff",
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  submit: {
    color: "#fff",
    marginBottom: 10,
    backgroundColor: "#428bca",
    paddingBottom: 20,
    marginTop: 40,
    width: wp("80%"),
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
  label: {
    fontSize: hp("3%"),
  },
  upload: {
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  Dropdown: {
    width: wp("80%"),
    /* height: hp("15%"),
    padding: 15, */
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  // add button style
  buttonStyle: {
    flexDirection: "row",
    paddingVertical: 5,
    backgroundColor: "#428bca",
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: "#428bca",
    padding: 10,
    width: wp("80%"),
    borderRadius: 5,
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
  },
});
