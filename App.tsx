import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import { CheckAuth } from "./HOC/check-auth";
import store from "./store";
import { GeneralSettings } from "./HOC/general-settings";
import { useLoadFonts } from "./HOC/useLoadFonts";
import * as SplashScreen from "expo-splash-screen";
import "./i18n/i18n";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { fontsLoaded }: { fontsLoaded: boolean } = useLoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
      }}>
      <Provider store={store}>
        <GeneralSettings>
          {!isLoadingComplete ? (
            <View>
              <Text>loading....</Text>
            </View>
          ) : (
            <SafeAreaProvider>
              <CheckAuth>
                <Navigation />
                <StatusBar />
              </CheckAuth>
            </SafeAreaProvider>
          )}
        </GeneralSettings>
      </Provider>
    </View>
  );
}
