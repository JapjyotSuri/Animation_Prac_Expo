import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated,{ interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const CardHeight = 180;
const CardWidth = (3 / 4) * CardHeight;
const AnimatedCards = () => {
    const cards=new Array(4).fill(null)
    const progress=useSharedValue(0);
  return (
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}
      onTouchStart={
        () => {
          console.log('Touched')
          progress.value=withSpring(1,{
            mass: 2//this property comtrolls the bounciness and speed of the spring.Higher the value of mass the slower the speed of the animation and the bouncer the animation will be.
          })
        }
      }
      onTouchEnd={() => {
        console.log('Finger lifted')
        progress.value=0
      }}
    >
      {
        //   cards.map((index) => ( writing this wont work as nowindex gets assigned the value of each element which i set to null hence giving warning
        cards.map((_,index) => {//this gives an error but we will remove this error by using interpolate in reanimated because we violate an imp rule in react in which we are using a hook inside a loop
          //to not violate the above rule we can make a new component that sets the animated style
          const rStyle=useAnimatedStyle(() => {
            console.log(progress.value);
            const translateX=interpolate(progress.value,[0,1],[0,index*25])//now interpolate is going to automatically map the value of the ouput based on its position between 0 and 1
            const translateY=interpolate(progress.value,[0,1],[0,-index*25])
            const rotate=interpolate(progress.value,[0,1],[-index*10,index*10])
            return{
              transform: [
                {
                  translateX: translateX,//this becomes 0 when cards are not touched and becomes index*25 when progress.value becomes 1
                },
                {
                    translateY: translateY,
                }
                ,
                {
                rotate: `${rotate} deg`,
                }
              ]
            }
          })
          return(
            <Animated.View key={index} style={[styles.card,rStyle,{
              //style for initial state where the cards are stacked up on each other with each card having a different rotation value
              // zIndex: -index,//here if we dont write this then the last card will come at the top and not the first card
              // transform: [{
              //     rotate: `${-index * 10 } deg`,//here we have written - as we want the cards to rotate in the other direction
              // }]
              //second intermediate state where the cards are horizontally next to each other  
              // zIndex: -index,//here if we dont write this then the last card will come at the top and not the first card
              // transform: [
              //     {
              //         translateX: index * 20,
              //     }
              //     ,
              //     {
              //     rotate: `0 deg`,
              // }]
              // style for the final frame
              // zIndex: -index,//here if we dont write this then the last card will come at the top and not the first card
              // transform: [
              //     {
              //         translateX: index * 25,
              //     },
              //     {
              //         translateY: -index * 5,
              //     }
              //     ,
              //     {
              //     rotate: `${index * 10} deg`,//here we have written - as we want the cards to rotate in the other direction
              // }]

              zIndex: -index,//here if we dont write this then the last card will come at the top and not the first card
              transform: []

           }]}><Text>Hello</Text></Animated.View>
          )
        }
        )
      }
    </View>
  )
}

export default AnimatedCards

const styles = StyleSheet.create({
    card : {
        position: 'absolute',
        height: CardHeight,
        width: CardWidth,
        borderRadius: 20,
        borderCurve: 'continuous',
        backgroundColor: 'white',
        shadowColor: '#bbbbbb',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 4,
        borderWidth: 0.5,
        borderColor: '#a0a0a0',
        padding: 10
    }
})