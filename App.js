import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import auth from '@react-native-firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "./resources";
import { useNetInfo } from "@react-native-community/netinfo";
import { offlineSnackBar, onlineSnackBar, showSnackBar } from "./utils/utils";
import Snackbar from "react-native-snackbar";

const App = () => {

  const [firebaseInitializing, setFirebaseInitializing] = useState(true);
  const [loggedInUser, setLoggedInUUser] = useState(null);

  const netInfo = useNetInfo()

  useEffect(() => {
    const { isConnected, type } = netInfo;
    if (!isConnected && type !== 'unknown') {
      offlineSnackBar()
    } else if (isConnected) {
      onlineSnackBar(type)
    }

  }, [netInfo])

  function onAuthStateChanged(user) {
    setLoggedInUUser(user);
    if (firebaseInitializing) setFirebaseInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  if (firebaseInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={COLORS.primary} size={40} />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation loggedInUser={loggedInUser} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
