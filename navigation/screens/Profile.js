import { Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Button } from "react-native-elements";
import auth from "@react-native-firebase/auth";

const Profile = () => {

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <Button
        title={'Logout'}
        onPress={() => auth().signOut()}
      />
    </SafeAreaView>
  );
};

export default Profile;
