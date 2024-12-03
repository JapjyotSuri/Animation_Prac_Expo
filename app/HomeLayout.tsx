import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type itemType = {
  id: number;
  row: number;
  col: number;
};

const HomeLayout = () => {
  const data = [
    {
      id: 1,
      col: 1,
      row: 1,
    },
    {
      id: 2,
      col: 2,
      row: 1,
    },
    {
      id: 3,
      col: 3,
      row: 1,
    },
    {
      id: 4,
      col: 4,
      row: 1,
    },
    {
      id: 5,
      col: 5,
      row: 1,
    },
    {
      id: 6,
      col: 1,
      row: 2,
    },
    {
      id: 7,
      col: 2,
      row: 2,
    },
    {
      id: 8,
      col: 3,
      row: 2,
    },
    {
      id: 9,
      col: 4,
      row: 2,
    },
    {
      id: 10,
      col: 5,
      row: 2,
    },
    {
      id: 11,
      col: 1,
      row: 3,
    },
    {
      id: 12,
      col: 2,
      row: 3,
    },
    {
      id: 13,
      col: 3,
      row: 3,
    },
    {
      id: 14,
      col: 4,
      row: 3,
    },
    {
      id: 15,
      col: 5,
      row: 3,
    },
  ];
  useEffect(() => {
    console.log("row", row);
    console.log("col", col);
    console.log(blockRef.current?.style.width);
  });
  const blockRef = useRef(null);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const prevX = useSharedValue(0);
  const prevY = useSharedValue(0);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const threshold = 120;
  const drag = Gesture.Pan()
    .onStart(() => {
      prevX.value = x.value;
      prevY.value = y.value;
    })
    .onUpdate((event) => {
      if (event.translationX < -threshold && col < 5) {
        x.value = withTiming(prevX.value - 500, { duration: 200 }); //when I am dragging the card to the left the current position of the card is going to the left
      } else if (event.translationX > threshold && col > 0) {
        console.log("pulled");
        x.value = withTiming(prevX.value + 500, { duration: 200 });
      } else {
        x.value = withTiming(prevX.value, { duration: 200 });
      }
      if (event.translationY < -threshold && row < 3) {
        //moving the card vertically up
        y.value = withTiming(prevY.value - 500, { duration: 200 });
      } else if (event.translationY > threshold && row > 0) {
        y.value = withTiming(prevY.value + 500, { duration: 200 });
      } else {
        y.value = withTiming(prevY.value, { duration: 200 });
      }
    })
    .onEnd(() => {
      if (x.value > prevX.value) {
        runOnJS(setCol)(col - 1);
      }
      if (x.value < prevX.value) {
        runOnJS(setCol)(col + 1);
      }
      if (y.value > prevY.value) {
        runOnJS(setRow)(row - 1);
      }
      if (y.value < prevY.value) {
        runOnJS(setRow)(row + 1);
      }
    });

  const groupedData = data.reduce((acc: any, item: itemType) => {
    if (!acc[item.row]) {
      acc[item.row] = [];
    }
    acc[item.row].push(item);
    return acc;
  }, {});
  //  by the above logic the grouped array looks like
  // {
  //     1: [ { id: 1, col: 1, row: 1 }, { id: 2, col: 2, row: 1 } ],
  //     2: [ { id: 3, col: 3, row: 2 }, { id: 4, col: 4, row: 2 } ],
  //     3: [ { id: 5, col: 5, row: 3 } ]
  //   }
  const animateStyleMove = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={drag}>
        <View style={{ flex: 1, padding: 10 }}>
          {Object.keys(groupedData).map(
            (
              RowArray //in this line we are iterating over the keys in the grouped that are 1,2,3 in this case and then we further iterate over the arrays present in the groupedData[key]
            ) => (
              <Animated.View
                style={[
                  {
                    height: "auto",
                    width: "auto",

                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 10,
                    gap: 10,
                  },
                  animateStyleMove,
                ]}
              >
                {groupedData[RowArray].map((item) => {
                  const animateStyle = useAnimatedStyle(() => {
                    return {
                      opacity: withTiming(
                        item.row === row && item.col === col ? 1 : 0.2,
                        { duration: 200 }
                      ),
                    };
                  });
                  return (
                    <View
                      ref={blockRef}
                      style={{
                        width: "98%",
                        height: 500,
                        marginHorizontal: 10,
                        padding: 10,
                        borderColor: "white",
                        borderWidth: 2,
                        backgroundColor: "black",
                      }}
                    >
                      <Text style={{ color: "white" }}>Hi</Text>
                    </View>
                  );
                })}
              </Animated.View>
            )
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({});
