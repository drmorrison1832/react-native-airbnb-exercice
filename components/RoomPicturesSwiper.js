import { View, Text, ImageBackground } from "react-native";

import Swiper from "react-native-swiper";
import styles from "../assets/styles/styles";
import colors from "../assets/styles/colors";

export default function RoomPicturesSwiper({ data, height, price }) {
  // console.log("data:", data);

  return (
    <View style={{ height: height, position: "relative" }}>
      <View style={styles.containers.priceContainer}>
        <Text style={styles.text.priceBoxText}>{price} €</Text>
      </View>
      <Swiper
        style={{ height: height }}
        showsButtons={true}
        dotColor={colors.lightGrey1}
        activeDotColor={colors.white}
        nextButton={<></>}
        prevButton={<></>}
      >
        {data.map((element) => {
          return (
            <ImageBackground
              key={element.picture_id}
              source={{ uri: element.url }}
              resizeMode="cover"
              style={{ height: height, width: "100%" }}
            ></ImageBackground>
          );
        })}
      </Swiper>
    </View>
  );
}
