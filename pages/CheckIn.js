import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, Image, Modal, ScrollView, Animated } from 'react-native';
import { ICONS } from '../constants';
import Btn from '../components/Btn';
import photo from '../assets/photo.jpg';
import * as LocalAuthentication from 'expo-local-authentication'
import * as Location from 'expo-location';
import AlertModal from '../components/AlertModal';
import Boundary, {Events} from 'react-native-boundary'
import Profile from './Profile';


export default function Checkin (props){
    tab = props.page
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

    const woodstockCampus = [-33.927330,18.455440]

    function deg2rad(deg) {
    return deg * (Math.PI/180)
    }

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    console.log('Distance:', d)
    return d;
    }

    function isOnCampus(dist){
    isOn = false;
    if (dist<0.3){
        isOn = true;
    }
    return isOn
    }

    const handleBiometricAuth = async () => {  
    let biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Check-in to Campus',
            disableDeviceFallback: true,
            cancelLabel: 'Cancel',
        });

    const { status } = await Location.requestForegroundPermissionsAsync();
    let locationResult = await Location.getCurrentPositionAsync({});
    distanceFromCampus = getDistanceFromLatLonInKm(woodstockCampus[0],woodstockCampus[1],locationResult["coords"]["latitude"],locationResult["coords"]["longitude"]);
    

    if (biometricAuth["success"]){
        if (isOnCampus(distanceFromCampus)){
        setShowAlert(true)
        }else {
        setShowError(true)
        console.log("can't checkin if you're not on campus")
            } 
        }

        console.log('wood 0:',woodstockCampus[0])
        console.log('wood 1:',woodstockCampus[1])
        console.log('locresLat:',locationResult["coords"]["latitude"])
        console.log('locresLon:',locationResult["coords"]["longitude"])
        console.log('distance:',distanceFromCampus)
        console.log('ison Result:', isOnCampus(distanceFromCampus))

        console.log('Scan Result:', biometricAuth["success"]);
        console.log('Location Result:', locationResult);
        }

    const [showAlert, setShowAlert] = useState(false);
        
    const [showError, setShowError] = useState( false);

    if (props.show =="Check in") {return <Animated.View>
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

        <Image 
            source={ICONS.checkinImage} 
            style={{
            width: '100%',
            height: 300,
            resizeMode: "contain",
            borderRadius: 15,
            marginTop: 25
          }}>
        </Image>

        <Text style={{
        fontSize: 20,
        fontWeight: 'bold', 
        paddingTop: 15,
        paddingBottom: 5
        }}>{"Scan to Check-in"}
        </Text>


        <View style={{alignSelf: 'stretch',}}>
            
            <Btn title="CHECK IN"
            style={{
            flex:1,
            flexDirection:'row',
            alignSelf:'center',
            justifyContent:'flex-end',
            marginLeft: 300,
            }} onPress={handleBiometricAuth}></Btn>
          
        </View>


     </Animated.View>
    
    }return<View></View>
}