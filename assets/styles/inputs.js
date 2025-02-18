import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  default: {
    height: 44,
    borderBottomWidth: 2,
    borderColor: colors.lightRed,
    alignSelf: "stretch",
    fontSize: 16,
  },
  multiline: {
    borderWidth: 2,
    borderColor: colors.lightRed,
    marginTop: 20,
    alignSelf: "stretch",
    fontSize: 16,
  },
});
