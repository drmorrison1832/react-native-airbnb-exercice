import { TouchableHighlight, Text, StyleSheet } from "react-native";
import colors from "../assets/styles/colors";

export default function ({ text }) {
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={colors.lightRed}
      onPress={() => alert("Welcome!")}
      style={buttonStyle.container}
    >
      <Text style={buttonStyle.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const buttonStyle = StyleSheet.create({
  container: {
    minWidth: 200,
    justifyContent: "center",
    // minHeight: 50,
    // borderColor: "blue",
    // borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    padding: 15,
    borderColor: colors.mainRed,
    borderWidth: 3,
    borderRadius: 30,
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
    color: colors.darkGrey,
  },
});
