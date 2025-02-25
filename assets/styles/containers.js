import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  default: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  shortTextInputContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    // borderColor: "blue",
    borderColor: colors.lightRed,
    flexDirection: "row",
  },
  longTextInputContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.lightRed,
    flexDirection: "row",
    height: 100,
  },
  errorInputContainer: { backgroundColor: "mistyrose" },
});

// borderColor: "blue",
//     borderWidth: 1,
