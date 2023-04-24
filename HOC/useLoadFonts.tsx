import { useFonts } from "expo-font";

export function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    gotham: require("../assets/fonts/en/GothamRounded-Book.ttf"),
    thesans_plain: require("../assets/fonts/ar/thesans_plain.ttf"),
  });

  return { fontsLoaded };
}
