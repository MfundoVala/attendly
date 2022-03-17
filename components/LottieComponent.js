import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export class LottieComponent {
    constructor(props) {

        function componentDidMount() {
            this.animation.play();
            // Or set a specific startFrame and endFrame with:
            // this.animation.play(30, 120);
        }
        componentDidMount();

        resetAnimation = () => {
            this.animation.reset();
            this.animation.play();
        };

        return (
            <View style={styles.animationContainer}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    } }
                    style={{
                        width: 400,
                        height: 400,
                        backgroundColor: '#eee',
                    }}
                    source={require('../assets/checkin.json')} />
                <View style={styles.buttonContainer}>
                    <Button title="Restart Animation" onPress={this.resetAnimation} />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
