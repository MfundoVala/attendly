import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native'
import { COLORS, FONTS } from "../constants"


export default function Btn(props) {

    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
        ).start()
    }, [])


    const styles = StyleSheet.create({
        container: {
            width: "60%",
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderTopWidth: 0,
            borderLeftWidth: 25,
            borderLeftColor: "transparent",

        },
        text: {
            color: COLORS.white,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 3,
            marginTop: 0
        },

        cutDiamond: {
            width: "50%",
            height: 100,
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 90,
            marginLeft: 50
          },
          cutDiamondTop: {
            width: "60%",
            height: 0,
            borderTopWidth: 0,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderLeftWidth: 25,
            borderBottomColor: COLORS.primary,
            borderBottomWidth: 25,
          },
          cutDiamondBottom: {
            width: "60%",            
            height: 0,
            borderTopWidth: 70,
            borderTopColor: COLORS.primary,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderBottomWidth: 0,
          },
        
    })

    return <Animated.View style={
        styles.cutDiamond
    }>
        <TouchableOpacity onPress={props.onPress} style={styles.cutDiamondTop}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPress} style={styles.cutDiamondBottom}>
        
        </TouchableOpacity>
        
    </Animated.View>
}