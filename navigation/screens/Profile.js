import { View, SafeAreaView, StyleSheet, Image, ImageBackground, Text, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { COLORS, CustomIcons } from '../../resources';
import _ from 'lodash';
import { launchImageLibrary } from 'react-native-image-picker';
import { RNToasty } from 'react-native-toasty';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";


const Profile = () => {

  const usersCollections = firestore().collection('users');
  const currentUserUID = auth().currentUser.uid;
  const userDocs = usersCollections.doc(currentUserUID);
  const [user, setUser] = useState(async () => {
    return (await userDocs.get()).data();
  });
  const [uploadImage, setUploadImage] = useState(false);

  useLayoutEffect(() => {
    const subscriber = userDocs
      .onSnapshot(documentSnapshot => {
        setUser(documentSnapshot.data())
      });

    return subscriber;
  }, [])

  const updateProfileImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        selectionLimit: 1
      }
      const result = await launchImageLibrary(options);
      if (result.didCancel) return;


      const assets = result.assets[0];
      setUploadImage(true)
      const imageStorageRef = storage().ref(`profileImages/${currentUserUID}`);
      await imageStorageRef.putFile(assets.uri);

      userDocs
        .update({
          profileUri: await imageStorageRef.getDownloadURL()
        })
        .then(() => {
          RNToasty.Show({
            title: 'Profile Updated Successfully',
            position: 'bottom',
          })
          setUploadImage(false)
        })

    } catch (e) {
      console.log(e, "upload image error")
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View 
        style={styles.profile}
      >
        <View style={styles.profileImageInfoContainer}>
          <TouchableOpacity
            onPress={updateProfileImage}
          >
            <ImageBackground
              source={user.profileUri ? { uri: user.profileUri } : require('../../resources/images/no_profile_placeholder.png') }
              style={styles.profileImage}
              imageStyle={{
                borderRadius: 50
              }}
            >
              {uploadImage ? <ActivityIndicator color={COLORS.primary} size={30} /> : null}
            </ImageBackground>
            <CustomIcons 
              style={{ position: 'absolute', bottom: 0, right: 0 }} 
              name='camera' 
              color={COLORS.primary} 
              size={30} 
            />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
              <Text style={styles.username}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <CustomIcons 
          name='pencil'
          size={30}
          onPress={() => {
            console.log('edit profile')
          }}
          color={COLORS.primary}
        />
      </View>
      <Button 
        title='logout'
        onPress={() => {
          ReactNativeForegroundService.remove_task('locationUpdate')
          ReactNativeForegroundService.stop()
          auth()
            .signOut()
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  profileImageInfoContainer: {
    flexDirection: 'row', 
    flexShrink: 1
  },
  profileImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileInfo: {
    flexShrink: 1,
    marginHorizontal: 20,
  },
  username: {
    fontWeight: '800', 
    fontSize: 20
  },
  email: {
  }
})

export default Profile;
