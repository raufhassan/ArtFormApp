import { StyleSheet } from "react-native";
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
  },

  myText: { fontSize: hp("5%"), color: "#000" },
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
