

export default function () {
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

                <Image source={showMenu ? close : menu} style={{
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

            <Image source={photo} style={{
                width: '100%',
                height: 300,
                borderRadius: 15,
                marginTop: 25
            }}></Image>

            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
                , paddingTop: 15,
                paddingBottom: 5
            }}>Niamh Spingies</Text>

            <Text style={{
            }}>Techie, YouTuber, PS Lover, Apple Sheep's Sister</Text>
            </Animated.View>
        
    }