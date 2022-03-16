import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native'
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
            borderTopLeftRadius: 30

        },
        text: {
            color: COLORS.white,
  
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 3,
            marginTop: 1
        }
    })

    return <Animated.View style={{
        opacity: opacity,
        ...props.style
    }}>
        <TouchableOpacity onPress={props.onPress} style={{...styles.container, ...props.btnStyle}}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </Animated.View>
}