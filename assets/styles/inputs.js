import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  default: {
    height: 44,
    // borderBottomWidth: 2,
    // borderColor: colors.lightRed,
    alignSelf: "stretch",
    fontSize: 16,
    flexGrow: 1,
  },

  defaultLongTextInput: {
    // borderWidth: 2,
    // borderColor: colors.lightRed,
    // marginTop: 20,
    paddingHorizontal: 2,
    alignSelf: "stretch",
    flexGrow: 1,
    // justifyContent: "left",
    fontSize: 16,
  },
});
