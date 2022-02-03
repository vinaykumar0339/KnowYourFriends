import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import auth from '@react-native-firebase/auth';

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
    <Navigation loggedInUser={loggedInUser} />
  );
};

export default App;
