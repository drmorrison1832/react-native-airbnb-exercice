import { Text, Pressable } from "react-native";
import { useState } from "react";
import styles from "../assets/styles/index";
import colors from "../assets/styles/colors";

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
      <Text style={styles.text.showMoreText}>
        Show more{" "}
        {descriptionIsCollapsed ? (
          <Icons.CaretDown size={17} color={colors.darkGrey} />
        ) : (
          <Icons.CaretUp size={17} color={colors.darkGrey} />
        )}
      </Text>
    </Pressable>
  );
}
