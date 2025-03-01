import { ImageBackground } from "react-native";

import PriceBox from "./PriceBox";

export default function RoomShowcasePicture({ URI, height, price }) {
  return (
    <ImageBackground
      source={{ uri: URI }}
      resizeMode="cover"
      style={{ height: height, width: "100%" }}
    >
      <PriceBox price={price} />
    </ImageBackground>
  );
}
