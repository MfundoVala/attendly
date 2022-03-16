import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from './assets/attendwe.png';
import { COLORS, FONTS, ICONS, SHADOW } from "./constants"
import * as LocalAuthentication from 'expo-local-authentication'
import * as Location from 'expo-location';
import Boundary, {Events} from 'react-native-boundary'
import AlertModal from './components/AlertModal';
import { useFonts } from 'expo-font';

import Checkin from './pages/CheckIn';
// Photo
import photo from './assets/photo.jpg';
import Btn from './components/Btn';

export default function App() {
  const [currentTab, setCurrentTab] = useState("Profile");
  
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  // wherever the useState is located 
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

  const [loaded] = useFonts({
    PopMed: require('./assets/fonts/Poppins-Medium.ttf'),
    PopReg: require('./assets/fonts/Poppins-Regular.ttf'),
    PopSemBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  //check whether device has the right hardware
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

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


const [showAlert, setShowAlert] = useState(
  false,
);

const [showError, setShowError] = useState(
  false,
);
checkBiometricAuth
  return (
    <SafeAreaView style={styles.container}>
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

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          marginTop: 30,
          marginLeft: -10
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 10
        }}>Attendly</Text>

        <TouchableOpacity 
        >
          <Text style={{
            marginTop: 0,
            color: 'white'
          }}>by We Think Code_</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Profile", ICONS.home)}
          {TabButton(currentTab, setCurrentTab, "Check in", ICONS.fingerPrint)}
          {TabButton(currentTab, setCurrentTab, "Notice board", ICONS.notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", ICONS.settings)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", ICONS.logout)}
        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? ICONS.close : ICONS.menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20
          }}>{currentTab}</Text>
        
          <Image source={
            (currentTab=="Home" || currentTab=="Profile") ? photo 
            : (currentTab=="Check in") ? ICONS.fingerPrint
            : (currentTab=="Notice board") ? ICONS.notifications
            : (currentTab=="Settings") ? ICONS.settings
            : ICONS.menu} 
            
            style={{
            width: '100%',
            height: 300,
            borderRadius: 15,
            marginTop: 25
          }}></Image>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold', 
            paddingTop: 15,
            paddingBottom: 5
          }}>{currentTab=="Profile" ? "Niamh Spingies" : " " }</Text>

          <Text style={{
          }}>{currentTab=="Profile" ? "Techie, YouTuber, PS Lover, Apple Sheep's Sister" : " " }</Text>

          <Btn title="CHECK IN" style={{
            marginTop: 100,
            marginLeft: 100,
            fontFamily: "PopSemBold"
          }} onPress={handleBiometricAuth}></Btn>

<Text style={{
            fontSize: 11,
            fontWeight: 'bold', 
            color: "grey",
            marginTop: 90,
            marginLeft: 90}}> {isBiometricSupported ? 'Your device is compatible with Biometrics' 
              : 'Face or Fingerprint scanner is not available on this device'}
                  </Text>
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B82C2',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 30
  },
});
