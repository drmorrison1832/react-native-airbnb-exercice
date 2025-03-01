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
    // alignItems: "center",
    // justifyContent: "space-between",
    borderColor: "pink",
    borderWidth: 1,
    overflow: "hidden",
  },

  // ROOMS FLAT LIST

  flatList: { width: "100%", paddingHorizontal: 20, paddingTop: 20 },

  flatListRoomContainer: {
    // borderColor: "red",
    // borderWidth: 1,
  },

  priceContainer: {
    width: 100,
    position: "absolute",
    bottom: 10,
  },

  flatListDetailsContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",

    overflow: "hidden",
  },

  flatListRoomTextContainer: {
    flexGrow: 0,
    flexShrink: 1,
  },

  flatListRoomRateContainer: {
    flexDirection: "row",
  },

  separator: {
    borderColor: colors.lightGrey2,
    borderWidth: 1,
    marginVertical: 15,
  },

  // ROOM

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
