import { View, TextInput } from "react-native";

import styles from "../assets/styles/styles";

export default function LongTextInput({
  placeholder,
  state,
  setState,
  name,
  errorFields,
  setErrorFields,
  refs,
  refIndex,
}) {
  return (
    <View style={styles.containers.longTextInputContainer}>
      <TextInput
        style={[
          styles.inputs.defaultLongTextInput,
          errorFields.includes(name) && styles.containers.errorInputContainer,
        ]}
        placeholder={placeholder}
        value={state}
        onChange={(event) => {
          setState(event.nativeEvent.text);
          if (errorFields.indexOf(name) !== -1) {
            let newErrorFields = [...errorFields];
            newErrorFields.splice(errorFields.indexOf(name), 1);
            // console.log(newErrorFields);
            setErrorFields(newErrorFields);
          }
        }}
        multiline
        maxLength={250}
        ref={refs?.[refIndex] || null}
      />
    </View>
  );
}
