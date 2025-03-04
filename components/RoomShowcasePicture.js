import { ImageBackground, View, Text } from "react-native";
import styles from "../assets/styles/styles";

// import PriceBox from "./PriceBox";

export default function RoomShowcasePicture({ URI, height, price }) {
  return (
    <ImageBackground
      source={{ uri: URI }}
      resizeMode="cover"
      style={{ height: height, width: "100%" }}
    >
      {/* <PriceBox price={price} /> */}
      <View style={styles.containers.priceContainer}>
        <Text style={styles.text.priceBoxText}>{price} €</Text>
      </View>
    </ImageBackground>
  );
}
