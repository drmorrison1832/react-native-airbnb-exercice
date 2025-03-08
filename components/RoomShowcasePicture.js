import { ImageBackground, View, Text } from "react-native";
import styles from "../assets/styles/index";

export default function RoomShowcasePicture({ URI, height, price }) {
  return (
    <ImageBackground
      source={{ uri: URI }}
      resizeMode="cover"
      style={{ height: height, width: "100%" }}
    >
      <View style={styles.containers.priceContainer}>
        <Text style={styles.text.priceBoxText}>{price} €</Text>
      </View>
    </ImageBackground>
  );
}
