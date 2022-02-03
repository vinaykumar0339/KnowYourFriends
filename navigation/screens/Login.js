import { View, Text, SafeAreaView, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '.';

const Login = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>Login</Text>
            <Button title='Go To Register' onPress={() => navigation.navigate(SCREENS.register)} />
        </SafeAreaView>
    );
};

export default Login;
