import { FC } from "react";
import { StyleSheet, Text as TextTypography, TextProps } from "react-native";
import { isRTL } from "../../i18n/isRTL";
import { Heading } from "../../Types/shared";
import { utilStyles } from "../../utils/config";

interface TextPropsType extends TextProps {
  text: string;
  variant: Heading;
}

export const Text: FC<TextPropsType> = ({
  text,
  variant,
  ...rest
}: TextPropsType) => {
  return (
    <TextTypography
      {...rest}
      style={[styles[variant], styles.fontFamily, rest.style]}>
      {text}
    </TextTypography>
  );
};

const styles = StyleSheet.create({
  [Heading.h1]: { fontSize: 32, fontWeight: "bold" },
  [Heading.h2]: { fontSize: 24, fontWeight: "bold" },
  [Heading.h3]: { fontSize: 20, fontWeight: "bold" },
  [Heading.h4]: { fontSize: 18, fontWeight: "bold" },
  [Heading.h5]: { fontSize: 16, fontWeight: "bold" },
  [Heading.h6]: { fontSize: 14, fontWeight: "bold" },
  [Heading.p]: { fontSize: 16, lineHeight: 24 },
  [Heading.span]: { fontSize: 14, fontWeight: "400" },
  [Heading.label]: {
    fontSize: 20,
    fontWeight: "600",
  },
  fontFamily: {
    fontFamily: !isRTL() ? "gotham" : "thesans_plain",
    textAlign: !isRTL() ? "left" : "right",
  },
});
