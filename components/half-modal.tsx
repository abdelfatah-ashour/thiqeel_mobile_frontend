import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";

type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const HalfModal = ({ open, children, onClose }: ModalPropsType) => {
  return (
    <Modal
      isVisible={open}
      style={styles.bottomModal}
      onBackdropPress={onClose}>
      <View style={styles.modalContent}>{children}</View>
    </Modal>
  );
};

export default HalfModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    flexDirection: "row",
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
