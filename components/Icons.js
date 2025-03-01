import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";

export default {
  Airbnb,
  CaretUp,
  CaretDown,
  CaretLeft,
  MapMarker,
  StarRateFull,
  StarRateHalf,
  StarRateEmpty,
  User,
};

function sizeIndex(size) {
  switch (size) {
    case "XS":
      return 15;
    case "small":
    case "S":
      return 30;
    case "medium":
    case "M":
      return 90;
    case "large":
    case "L":
      return 120;
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

function Airbnb(props) {
  return (
    <FontAwesome5
      name="airbnb"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function CaretDown(props) {
  return (
    <AntDesign
      name="caretdown"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function CaretLeft(props) {
  return (
    <AntDesign
      name="caretleft"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function CaretUp(props) {
  return (
    // <Text>
    <AntDesign
      name="caretup"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
    // </Text>
  );
}

function MapMarker(props) {
  return (
    <FontAwesome
      name="map-marker"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function StarRateFull(props) {
  return (
    <MaterialIcons
      name="star"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function StarRateHalf(props) {
  return (
    <MaterialIcons
      name="star-half"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function StarRateEmpty(props) {
  return (
    <MaterialIcons
      name="star-border"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}

function User(props) {
  return (
    <FontAwesome
      name="user"
      size={sizeIndex(props?.size)}
      color={props.color}
    />
  );
}
