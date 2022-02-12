// libraries
import {
    View,
    SafeAreaView,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Input, Button } from 'react-native-elements';
import auth from "@react-native-firebase/auth";
import Snackbar from "react-native-snackbar";


// modules
import { SCREENS } from '.';
import { COLORS, CustomIcons } from '../../resources';
import { checkNetWorkConnection, offlineSnackBar, showSnackBar } from "../../utils/utils";

const Login = () => {

    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const slider = useSharedValue(height);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        slider.value = withTiming(0, {
            duration: 1000
        });
    }, [])

    useEffect(() => {
        if (isValidEmail(email) && isValidPassword(password)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password])

    const imageStyles = useAnimatedStyle(() => {
        return {
            opacity: 1 - (slider.value / height)
        }
    })

    const bottomContainerStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: slider.value
            }]
        }
    })

    const registerButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: -slider.value
            }]
        }
    })

    const isValidEmail = (value) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(value);
    }

    const isValidPassword = (value = "") => {
       return value.length >= 6;
    }

    const handleChange = (value, key) => {
        if (key === 'email') {
            setEmail(value)
            if (isValidEmail(value)) {
                setEmailError('')
            } else {
                setEmailError('invalid email address.')
            }
        } else if (key === 'password') {
            setPassword(value)
            if (isValidPassword(value)) {
                setPasswordError('')
            } else {
                setPasswordError('password requires min 6 char.')
            }
        }
    }

    const handleSubmit = async () => {
        const isNetworkActive = await checkNetWorkConnection();
        if (!isNetworkActive) {
            offlineSnackBar()
            return
        }
        setLoading(true)
        setDisabled(true)
        try {
            const authResponse = await auth().signInWithEmailAndPassword(email, password);
            setLoading(false)
            setDisabled(false)
        } catch (e) {
            const { code } = e.userInfo;
            switch (code) {
                case 'user-not-found': {
                    showSnackBar(
                      'User not found. Please register first.',
                      Snackbar.LENGTH_SHORT,
                      {
                          text: 'Register',
                          textColor: COLORS.green,
                          onPress() {
                              navigation.navigate(SCREENS.register)
                          }
                      }
                    )
                    break;
                }
                case 'wrong-password': {
                    setPasswordError('wrong password.');
                    break;
                }
                case 'user-disabled': {
                    showSnackBar(
                      'User account disabled. Please contact support team.',
                      Snackbar.LENGTH_SHORT,
                      {
                          text: 'Ok',
                          textColor: COLORS.green,
                      }
                    )
                    break
                }
                case 'invalid-email': {
                    setEmailError('invalid email.')
                }
                default:
                    break
            }
            setLoading(false)
            setDisabled(false)
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View>
                <Animated.View style={[{ zIndex: 11 }, registerButtonStyles]}>
                    <Button
                      containerStyle={styles.registerButtonContainer}
                      buttonStyle={styles.registerButton}
                      title={'Register'}
                      onPress={() => navigation.navigate(SCREENS.register)}
                      TouchableComponent={TouchableOpacity}
                    />
                </Animated.View>
                <Animated.Image
                  style={[styles.image, imageStyles]}
                  source={require('../../resources/images/login_screen.png')}
                />
            </View>
            <Animated.View style={[styles.bottomContainer, bottomContainerStyles]}>
                <Input
                    label={'Email'}
                    labelStyle={styles.labelStyle}
                    value={email}
                    inputStyle={styles.inputStyle}
                    errorMessage={emailError}
                    onChangeText={(value) => handleChange(value, 'email')}
                    placeholder={'Enter Email'}
                    placeholderTextColor={COLORS.white}
                    leftIcon={<CustomIcons name='mail' size={30} />}
                />
                <Input
                    label={'Password'}
                    labelStyle={styles.labelStyle}
                    value={password}
                    inputStyle={styles.inputStyle}
                    errorMessage={passwordError}
                    secureTextEntry={!showPassword}
                    onChangeText={(value) => handleChange(value, 'password')}
                    placeholder={'Enter Password'}
                    placeholderTextColor={COLORS.white}
                    leftIcon={<CustomIcons name='key' size={30} />}
                    rightIcon={<CustomIcons onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye-blocked' : 'eye'} size={30} />}
                />
                <Button
                    title={'Login'}
                    buttonStyle={{
                        backgroundColor: COLORS.primary,
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    disabled={disabled}
                    loading={loading}
                    onPress={handleSubmit}
                    TouchableComponent={TouchableOpacity}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    icon={<CustomIcons name='enter' style={{marginRight: 10}} size={20} />}
                />
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    topContainer: {
    },
    registerButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        width: 150,
    },
    registerButton: {
        borderRadius: 20,
        backgroundColor: COLORS.secondary
    },
    image: {
        resizeMode: 'cover',
        height: 400,
        width: '100%',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        position: 'absolute',
        paddingVertical: 20,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    labelStyle: {
        color: COLORS.primary
    },
    inputStyle: {
        color: COLORS.white
    }
})

export default Login;
