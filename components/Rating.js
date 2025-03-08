import { View, Text } from "react-native";

import styles from "../assets/styles/index";
import colors from "../assets/styles/colors";

import Icons from "./Icons";

export default function Rating({ ratingValue, reviews }) {
  function rateToStars({ rate, size }) {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(Number(rate))) {
        stars.push(
          <Icons.StarRateFull key={i} size={size} color={colors.starsDefault} />
        );
      } else if (i - rate <= 0.5) {
        console.log("i-rate =", i - rate);
        stars.push(
          <Icons.StarRateHalf key={i} size={size} color={colors.starsDefault} />
        );
      } else {
        stars.push(
          <Icons.StarRateEmpty
            key={i}
            size={size}
            color={colors.starsDefault}
          />
        );
      }
    }
    return stars;
  }

  return (
    <View style={styles.containers.flatListRoomRateContainer}>
      <Text style={styles.text.ratingStars}>
        {rateToStars({
          rate: Number(ratingValue),
          size: styles.text.numberOfReviews.fontSize * 1.5,
        })}
      </Text>
      <Text style={styles.text.numberOfReviews}>{reviews} reviews</Text>
    </View>
  );
}
