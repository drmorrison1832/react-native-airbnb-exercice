import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import styles from "../assets/styles/index";
import colors from "../assets/styles/colors";
import { StyleSheet } from "react-native";

import Icons from "./Icons";

export default function RoomDescription({ description }) {
  const [descriptionIsCollapsed, setDescriptionIsCollapsed] = useState(true);

  return (
    <Pressable
      onPress={() => {
        setDescriptionIsCollapsed((prev) => !prev);
      }}
    >
      <Text
        style={styles.text.descriptionText}
        numberOfLines={descriptionIsCollapsed ? "3" : null}
      >
        {description}
      </Text>
      <View style={[styles.containers.inLineDefault]}>
        <Text style={[styles.text.showMoreText]}>Show more </Text>
        {descriptionIsCollapsed ? (
          <Icons.CaretDown
            size={"XS"}
            color={colors.darkGrey}
            containerStyle={[{ justifyContent: "flex-end", paddingBottom: 3 }]}
          />
        ) : (
          <Icons.CaretUp
            size={"XS"}
            color={colors.darkGrey}
            containerStyle={[{ justifyContent: "flex-end" }]}
          />
        )}
      </View>
    </Pressable>
  );
}
