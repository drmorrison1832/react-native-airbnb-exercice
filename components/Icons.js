// https://icons.expo.fyi/Index

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";

function IconComponent({ Library, name, containerStyle, size, color }) {
  return (
    <View style={[containerStyle]}>
      <Library name={name} size={sizeIndex(size)} color={color} />
    </View>
  );
}

function sizeIndex(size) {
  switch (size) {
    case "XS":
      return 15;
    case "small":
    case "S":
      return 30;
    case "medium":
    case "M":
      return 42;
    case "large":
    case "L":
      return 90;
    case "headerTitle":
      return 30;
    case "tabBarIcon":
      return 24;
    default:
      if (typeof size === "number") {
        return size;
      }
      return 90;
  }
}

export default {
  Airbnb: (props) => (
    <IconComponent Library={FontAwesome5} name="airbnb" {...props} />
  ),
  Back: (props) => <IconComponent Library={AntDesign} name="back" {...props} />,
  CaretUp: (props) => (
    <IconComponent
      Library={AntDesign}
      name="caretup"
      containerStyle={{}}
      {...props}
    />
  ),
  CaretDown: (props) => (
    <IconComponent Library={AntDesign} name="caretdown" {...props} />
  ),
  CaretLeft: (props) => (
    <IconComponent Library={AntDesign} name="caretleft" {...props} />
  ),
  Images: (props) => (
    <IconComponent Library={Entypo} name="images" {...props} />
  ),
  MapMarker: (props) => (
    <IconComponent Library={FontAwesome} name="map-marker" {...props} />
  ),
  MyLocation: (props) => (
    <IconComponent Library={MaterialIcons} name="my-location" {...props} />
  ),
  StarRateFull: (props) => (
    <IconComponent Library={MaterialIcons} name="star" {...props} />
  ),
  StarRateHalf: (props) => (
    <IconComponent Library={MaterialIcons} name="star-half" {...props} />
  ),
  StarRateEmpty: (props) => (
    <IconComponent Library={MaterialIcons} name="star-border" {...props} />
  ),
  TakePhoto: (props) => (
    <IconComponent
      Library={MaterialCommunityIcons}
      name="camera-plus"
      {...props}
    />
  ),
  Trash: (props) => (
    <IconComponent Library={FontAwesome5} name="trash" {...props} />
  ),
  User: (props) => (
    <IconComponent Library={FontAwesome} name="user" {...props} />
  ),
};
