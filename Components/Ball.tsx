import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const Ball = () => {
    const isPressed=useSharedValue(false);
    const offeset=useSharedValue({x: 0,y: 0})
    const start=useSharedValue({x: 0,y: 0})
    const gesture =Gesture.Pan().onBegin(() => {
        isPressed.value=true
    }).onUpdate((e) => {
        offeset.value={
            x: e.translationX + start.value.x,
            y: e.translationY + start.value.y,
        }
    }).onEnd((e) => {
        start.value={
            x: offeset.value.x,
            y: offeset.value.y,
        }
        
    }).onFinalize(() => {
        isPressed.value=false
    });
   
    const AnimatedStyles=useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offeset.value.x},
                {translateY: offeset.value.y},
                {scale: isPressed ? 1.2  : 1 }
            ]
        }
})
  return (
    <View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball,AnimatedStyles]}>

        </Animated.View>
      </GestureDetector>
    </View>
  )
}

export default Ball

const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    }
})