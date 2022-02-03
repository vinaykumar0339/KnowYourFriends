import { View, Text, SafeAreaView, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '.';

const Register = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>Register</Text>
            <Button title='Go To Login' onPress={() => navigation.navigate(SCREENS.login)} />
        </SafeAreaView>
    );
};

export default Register;
