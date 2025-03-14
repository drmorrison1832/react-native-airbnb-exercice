import { View, TextInput } from "react-native";

import styles from "../assets/styles/index";

export default function LongTextInput({
  placeholder,
  placeholderTextColor,
  state,
  setState,
  name,
  errorFields,
  setErrorFields,
  currentRef,
  style,
}) {
  return (
    <View style={styles.containers.longTextInputContainer}>
      <TextInput
        style={[
          styles.inputs.defaultLongTextInput,
          errorFields.includes(name) && styles.containers.errorInputContainer,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={state}
        onChange={(event) => {
          setState(event.nativeEvent.text);
          if (errorFields.indexOf(name) !== -1) {
            let newErrorFields = [...errorFields];
            newErrorFields.splice(errorFields.indexOf(name), 1);
            setErrorFields(newErrorFields);
          }
        }}
        multiline
        maxLength={250}
        ref={currentRef || null}
      />
    </View>
  );
}
