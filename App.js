import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from './assets/profile.png';
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
  //check whether local device has records send to front desk if not
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

const handleBiometricAuth = async () => {  
  let biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Check-in to Campus',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });
  const { status } = await Location.requestForegroundPermissionsAsync();
  let locationResult = await Location.getCurrentPositionAsync({});
  if (biometricAuth["success"]){setShowAlert(true)} 
  console.log('Scan Result:', biometricAuth["success"]);
  console.log('Location Result:', locationResult);
}

const getCurrentPosition = async () => {


}

const [showAlert, setShowAlert] = useState(
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

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>We Think Code</Text>

        <TouchableOpacity 
        >
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>Student Check-in</Text>
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
