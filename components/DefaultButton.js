import {
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../assets/styles/colors";
import styles from "../assets/styles/styles";

export default function ({
  text,
  onPress,
  disabled,
  // refs,
  // refIndex,
  currentRef,
}) {
  return (
    <>
      <Pressable
        // ref={refs?.[refIndex]}
        ref={currentRef || null}
        activeOpacity={1}
        underlayColor={colors.lightRed}
        onPress={onPress}
        style={({ pressed }) => [
          styles.buttons.defaultButton.container,
          !disabled &&
            pressed &&
            styles.buttons.defaultButton.container.pressed,
        ]}
      >
        <Text
          style={[
            styles.buttons.defaultButton.text,
            disabled && styles.buttons.defaultButton.text.disabled,
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </>
  );
}
