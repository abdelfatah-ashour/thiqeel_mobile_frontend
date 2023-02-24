import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { COLORS } from "../constants/Colors";

// constant
const CELL_COUNT = 6;

export function CodeFieldUI({
  value,
  onTextChanged,
}: {
  value: string;
  onTextChanged: (val: string) => void;
}) {
  const [val, setValue] = useState(value);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        value={val}
        onChangeText={text => {
          setValue(text);
          onTextChanged(text);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
            disabled={true}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  message_error: {
    marginTop: 6,
    color: COLORS._error_color,
    textTransform: "capitalize",
  },
  root: { flex: 1 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 50 },
  cell: {
    width: 60,
    marginHorizontal: 0.5,
    height: 80,
    lineHeight: 79,
    fontSize: 45,
    borderWidth: 3,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 6,
    fontWeight: "700",
    color: COLORS._primary_yellow,
  },
  focusCell: {
    borderColor: COLORS._links_hover,
  },
});
