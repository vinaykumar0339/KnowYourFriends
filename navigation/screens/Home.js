import { Text, SafeAreaView } from 'react-native';
import React from 'react';
import { COLORS, CustomIcons } from "../../resources";
import auth from "@react-native-firebase/auth";

const Home = () => {

    const user = auth().currentUser;

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{ color: COLORS.secondary }}>Email: {user.email}</Text>
        </SafeAreaView>
    );
};

export default Home;
