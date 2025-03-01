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
    opacity: 0.8,
  },

  searchResults: { roomTitle: { fontSize: 20 } },
  errorMessage: { alignSelf: "center", color: "red" },

  numberOfReviews: {
    fontSize: 15,
    color: colors.lightGrey2,
    // borderColor: "red",
    // borderWidth: 1,
  },

  //ROOM

  descriptionText: { fontSize: 16, color: colors.lightGrey1 },
  showMoreText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkGrey,
    // borderWidth: 1,
    padding: 4,
  },
});
