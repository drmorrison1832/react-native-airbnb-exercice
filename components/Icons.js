// https://icons.expo.fyi/Index

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";

export default {
  Airbnb,
  Back,
  CaretUp,
  CaretDown,
  CaretLeft,
  Images,
  MapMarker,
  MyLocation,
  StarRateFull,
  StarRateHalf,
  StarRateEmpty,
  TakePhoto,
  Trash,
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
    <View style={props?.containerStyle}>
      <FontAwesome5
        name="airbnb"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function Back(props) {
  return (
    <View style={props?.containerStyle}>
      <AntDesign
        name="back"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function CaretDown(props) {
  return (
    <View style={props?.containerStyle}>
      <AntDesign
        name="caretdown"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function CaretLeft(props) {
  return (
    <View style={props?.containerStyle}>
      <AntDesign
        name="caretleft"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function CaretUp(props) {
  return (
    <View style={props?.containerStyle}>
      <AntDesign
        name="caretup"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function Images(props) {
  return (
    <View style={props?.containerStyle}>
      <Entypo name="images" size={sizeIndex(props?.size)} color={props.color} />
    </View>
  );
}

function MapMarker(props) {
  return (
    <View style={props?.containerStyle}>
      <FontAwesome
        name="map-marker"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function MyLocation(props) {
  return (
    <View style={props?.containerStyle}>
      <MaterialIcons
        name="my-location"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function StarRateFull(props) {
  return (
    <View style={props?.containerStyle}>
      <MaterialIcons
        name="star"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function StarRateHalf(props) {
  return (
    <View style={props?.containerStyle}>
      <MaterialIcons
        name="star-half"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function StarRateEmpty(props) {
  return (
    <View style={props?.containerStyle}>
      <MaterialIcons
        name="star-border"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function TakePhoto(props) {
  return (
    <View style={props?.containerStyle}>
      <MaterialCommunityIcons
        name="camera-plus"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function Trash(props) {
  return (
    <View style={props?.containerStyle}>
      <FontAwesome5
        name="trash"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}

function User(props) {
  return (
    <View style={props?.containerStyle}>
      <FontAwesome
        name="user"
        size={sizeIndex(props?.size)}
        color={props.color}
      />
    </View>
  );
}
