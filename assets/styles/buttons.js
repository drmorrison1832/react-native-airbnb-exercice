import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  defaultButton: {
    container: {
      minWidth: 200,
      justifyContent: "center",
      borderRadius: 30,
      pressed: { backgroundColor: "mistyrose" },
    },
    text: {
      padding: 15,
      borderColor: colors.mainRed,
      borderWidth: 3,
      borderRadius: 30,
      fontSize: 20,
      fontWeight: "semibold",
      textAlign: "center",
      disabledColor: colors.lightGrey2,
      disabled: { color: colors.lightGrey2 },
    },
  },
});
