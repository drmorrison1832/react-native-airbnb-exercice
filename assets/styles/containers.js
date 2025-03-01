import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  default: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  inLineDefault: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },

  priceBox: { width: 100, position: "absolute", bottom: 10 },

  flatList: { width: "100%", paddingHorizontal: 20 },
  flatListRoomContainer: {},

  flatListRoomTextContainer: {
    flexGrow: 1,
    width: 1,
  },

  searchResultsRoomRateBox: {
    flexGrow: 1,
    flexDirection: "row",
  },
  separator: {
    // height: 0,
    borderColor: colors.lightGrey2,
    borderWidth: 1,
    marginVertical: 15,
  },

  shortTextInputContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    // borderColor: "blue",
    borderColor: colors.lightRed,
    flexDirection: "row",
  },
  longTextInputContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.lightRed,
    flexDirection: "row",
    height: 100,
  },
  errorInputContainer: { backgroundColor: "mistyrose" },
});

// borderColor: "blue",
//     borderWidth: 1,
