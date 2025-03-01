import { StyleSheet } from "react-native";

import colors from "./colors";

export default StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  priceBoxText: {
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 20,
    flexGrow: 1,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  searchResults: { roomTitle: { fontSize: 20 } },
  errorMessage: { alignSelf: "center", color: "red" },

  ratingStars: {},

  numberOfReviews: {
    fontSize: 15,
    color: colors.lightGrey2,
    // borderColor: "red",
    // borderWidth: 1,
  },
});
