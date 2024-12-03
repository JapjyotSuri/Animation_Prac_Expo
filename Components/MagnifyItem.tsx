import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
type itemType={
        id: string,
        title: string
    }
    type MagnifyingProps={
        item: itemType,
        index: number,
        scrollX: SharedValue<number>; // Type for Animated value
    }
const MagnifyItem = ({item,index,scrollX}: MagnifyingProps) => {
    const ITEM_WIDTH=width *0.6//setting width of item to 60%of the width available
    const inputRange = [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH];//the 0th index represents th estarting point,the item in the ist represents the current Item and the item on the 2nd index represents the end point
  //above is made to put in the input range of the interpoklate function in reanimated
    const animatedStyle=useAnimatedStyle(() => {//everytime the scrollX.value changes this object recalculates the elevation and scale
        const scale=interpolate(scrollX.value,inputRange,[0.8,1,0.8])//sets the previous items scale to 0.8 making them appear small and the main item to scale 1
        const elevation=interpolate(scrollX.value,inputRange,[0,10,0])
        return{
            transform: [{scale}],
            elevation

        }
    })
    return (
    <Animated.View style={[styles.card,animatedStyle]} >
      <Text>{item.title}</Text>
    </Animated.View>
  )
}

export default MagnifyItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#DAE0E2',
        width: width * 0.6,
        height: width * 0.2,
        margin: 16,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
       }
   
})