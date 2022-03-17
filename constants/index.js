
// Tab ICons...
import home from '../assets/home.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import fingerPrint from '../assets/fingerprint.png';
import checkinImage from '../assets/checkin.png';


// Menu Icons
import menu from '../assets/menu.png';
import close from '../assets/close.png';

const ICONS = {
    home,
    notifications,
    settings,
    logout,
    fingerPrint,
    menu,
    close,
    checkinImage
}
const FONTS = {
    h1_med: {fontSize: 20, fontFamily: "PopMed"},
    h1_reg: {fontSize: 20, fontFamily: "PopReg"},
    h1_SemBold: {fontSize: 20, fontFamily: "PopSemBold"},
    h2_med: {fontSize: 17, fontFamily: "PopMed"},
    h2_reg: {fontSize: 17, fontFamily: "PopReg"},
    h2_SemBold: {fontSize: 17, fontFamily: "PopSemBold"},
    h3_med: {fontSize: 13, fontFamily: "PopMed"},
    h3_reg: {fontSize: 13, fontFamily: "PopReg"},
    h3_SemBold: {fontSize: 13, fontFamily: "PopSemBold"},
    h4_med: {fontSize: 11, fontFamily: "PopMed"},
    h4_reg: {fontSize: 11, fontFamily: "PopReg"},
    h4_SemBold: {fontSize: 11, fontFamily: "PopSemBold"},
}

const COLORS = {
    primary: "#4B82C2",
    white: "#fff",
    blueVariant: "#ebf3f9",
}

const SHADOW = {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 13,
    elevation: 25,
}
const CLIENT_ID = "938505836966-inudjtli83caq7fmb89elckmfkl2q8cm.apps.googleusercontent.com"
const GOOGLE_API_KEY = "AIzaSyAraq6XXks6ixvO1Se8EZ9gTKijS9zxs3Q"
const SHEETS_API_URL = "https://sheets.googleapis.com/v4/spreadsheets/1QrcV3ifT7KlCiPin9MSS-1hpGHziVjH2f0b1L5Z0mMo/values/attendly?valueRenderOption=FORMATTED_VALUE&key=AIzaSyAraq6XXks6ixvO1Se8EZ9gTKijS9zxs3Q"


export {ICONS, COLORS, FONTS, SHADOW,GOOGLE_API_KEY,SHEETS_API_URL}