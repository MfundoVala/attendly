import { View, Text, StyleSheet, StatusBar, Platform, Image, Modal, ScrollView } from 'react-native'
import { COLORS, FONTS, ICONS, SHADOW, BORDER_TOP_RADIUS } from "../constants"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50,
        backgroundColor: COLORS.blueVariant
    },
    topContainer: {
        width: "100%",
        height: "45%",
        flexDirection: "column",
        alignItems: "center",
    },
    bottomContainer: {
        backgroundColor: COLORS.white,
        width: "100%",
        height: "55%",
        ...SHADOW,
        borderTopLeftRadius: 25,
        padding: 25,
        paddingBottom: 60
    },
    logo: {
        marginTop: "0%",
        height: "55%",

    },
    img: {
        width: "75%",
        height: "60%",
        marginTop:"-10%"
    },
    text: {
        textAlign: "center",
        marginVertical: 20
    },
    SocialMediaWrapper: {
        ...BORDER_TOP_RADIUS,
        position: "absolute",
        flex: 1,
        height: 60,
        backgroundColor: COLORS.primary,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 30,
        alignItems: "center",
    },
    flexDiv: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})