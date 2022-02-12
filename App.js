import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import auth from '@react-native-firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

const App = () => {

  const [firebaseInitializing, setFirebaseInitializing] = useState(true);
  const [loggedInUser, setLoggedInUUser] = useState(null);

  function onAuthStateChanged(user) {
    setLoggedInUUser(user);
    if (firebaseInitializing) setFirebaseInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation loggedInUser={loggedInUser} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
