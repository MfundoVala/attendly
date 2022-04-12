import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, Image, Modal, ScrollView,Animated } from 'react-native';
import { ICONS } from '../constants';
import Btn from '../components/Btn';
import photo from '../assets/photo.jpg';
import attendPhoto from '../assets/attended.png';
import absentPhoto from '../assets/absent.png';
import offDaysPhoto from '../assets/offdays.png';
import stipendPhoto from '../assets/stipend.png';
import encouragePhoto from '../assets/encourage.png';
import * as LocalAuthentication from 'expo-local-authentication'
import * as Location from 'expo-location';
import AlertModal from '../components/AlertModal';
import Boundary, {Events} from 'react-native-boundary'


export default function Profile (props){
      //check whether device has the right hardware
    useEffect(() => {
        (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
        })();
    });

    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

    //check whether local device has records  if not send to front desk
    const checkBiometricAuth = async () => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics)
        return Alert.alert(
            'Biometric record not found',
            'Please Check in at front desk',
            'OK',
            () => fallBackToDefaultAuth()
        ); 
    }
    checkBiometricAuth

    const [showAlert, setShowAlert] = useState(false);
        
    const [showError, setShowError] = useState( false);

    if (props.show =="Profile") {return <Animated.View>

        <AlertModal
        displayMode={'success'}
        displayMsg={'You have successfully Checked in.'}
        visibility={showAlert}
        dismissAlert={setShowAlert}
        />

        <AlertModal
        displayMode={'fail'}
        displayMsg={'Unable to Check-in!\n You are not on campus.'}
        visibility={showError}
        dismissAlert={setShowError}
        />

        <ScrollView>

        <Image 
            source={photo} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25,
          }}>
        </Image>
        <Text style={{
        fontSize: 20,
        fontWeight: 'bold', 
        paddingTop: 15,
        paddingBottom: 5
        }}>{"Niamh Spingies"}
        </Text>
        <Text>{"Techie, YouTuber, PS Lover, Apple Sheep's Sister"}</Text>

        <Image 
            source={attendPhoto} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25,
          }}>
        </Image>
        <Image 
            source={absentPhoto} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25,
          }}>
        </Image>
        <Image 
            source={offDaysPhoto} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25,
          }}>
        </Image>
        <Image 
            source={stipendPhoto} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25,
          }}>
        </Image>
        <Image 
            source={encouragePhoto} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25,
          }}>
        </Image>
        <Text style={{
        fontSize: 20,
        fontWeight: 'bold', 
        paddingTop: 15,
        paddingBottom: 5
        }}>{"Keep it up!"}
        </Text>


        </ScrollView>

     </Animated.View>
    
}  return<View></View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4B82C2',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 10,
      paddingTop: 30
    },
  });

