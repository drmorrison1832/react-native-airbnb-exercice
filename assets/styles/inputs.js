import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  default: {
    height: 44,
    borderBottomWidth: 3,
    borderColor: colors.lightRed,
    // marginBottom: 10,
    alignSelf: "stretch",
  },
  multiline: {
    borderWidth: 3,
    borderColor: colors.lightRed,
    marginTop: 20,
    alignSelf: "stretch",
  },
});
