import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import { CheckAuth } from "./HOC/check-auth";
import store, { useReduxDispatch } from "./store";
import { fetchGeneralSettingsApi } from "./utils/api/general";
import "./i18n/i18n";
import { GeneralSettings } from "./HOC/general-settings";

export default function App() {
  const isLoadingComplete = useCachedResources();

  return (
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
  );
}
