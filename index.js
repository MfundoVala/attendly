/**
 * @format
 */

import { AppRegistry } from "react-native";
import Splash from "./pages/Splash"

import {name as appName} from './app.json'
import App from "./App";

AppRegistry.registerComponent(appName, () => Splash);