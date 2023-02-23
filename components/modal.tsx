import * as React from "react";
import { StyleSheet, View } from "react-native";
import ModalNative from "react-native-modal";

import { ModalPropsType } from "../Types/shared";
import { Button, Text } from "react-native-paper";
import { COLORS } from "../constants/Colors";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "./_buttons";

export function Modal({ open, onHide, title, message }: ModalPropsType) {
  const { t } = useTranslation("common");
  return (
    <ModalNative
      isVisible={open}
      onModalHide={onHide}
      animationIn="bounceIn"
      animationInTiming={1000}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          {title}
        </Text>
        {message ? (
          <Text variant="labelLarge" style={styles.message}>
            {message}
          </Text>
        ) : null}
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <View style={{ width: 40 }}>
            <PrimaryButton title="ok" onPress={onHide} />
          </View>
        </View>
      </View>
    </ModalNative>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS._text_white,
    borderRadius: 8,
  },
  title: {
    textTransform: "capitalize",
    fontWeight: "600",
  },
  message: {
    marginTop: 8,
  },
});
