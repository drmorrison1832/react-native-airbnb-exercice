import { View } from "react-native";
import colors from "../assets/styles/colors";
import Icons from "./Icons";

export default function MapMarker() {
  return (
    <View
      style={{
        backgroundColor: colors.mainRed,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: "50%",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icons.Airbnb size="S" color={"white"} />
    </View>
  );
}
