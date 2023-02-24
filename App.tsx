import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Text, View } from "react-native";

import "react-native-gesture-handler";
import "./i18n/i18n";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      {!isLoadingComplete ? (
        <View>
          <Text>loading....</Text>
        </View>
      ) : (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />

          <StatusBar />
        </SafeAreaProvider>
      )}
    </Provider>
  );
}
