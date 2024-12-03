import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import MagnifyItem from "../Components/MagnifyItem";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import AnimatedCards from "../Components/AnimatedCards";
import CardsThreeD from "../Components/CardsThreeD";
import Ball from "../Components/Ball";
import { Link, useRouter } from "expo-router";

const DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
}));
const { width } = Dimensions.get("window");
const widthList = DATA.length * 200;
export default function App() {
  const router = useRouter();

  const [idx, setidx] = useState(1);
  const Threshold = 190;
  const translationX = useSharedValue(0);
  const prevX = useSharedValue(0);
  function handleNext() {
    setidx((prev) => prev + 1);
  }
  function handlePrev() {
    setidx((prev) => prev - 1);
  }
  const pan = Gesture.Pan()
    .onStart(() => {
      prevX.value = translationX.value;
    })
    .onUpdate((e) => {
      if (e.translationX < -Threshold + 30 && idx < DATA.length - 1) {
        translationX.value = withTiming(prevX.value - Threshold, {
          duration: 200,
        });
      } else if (e.translationX > Threshold + 30 && idx > 0) {
        translationX.value = withTiming(prevX.value + Threshold, {
          duration: 200,
        });
      } else {
        translationX.value = withSpring(prevX.value, { duration: 200 });
      }
    })
    .onEnd(() => {
      if (translationX.value > prevX.value) {
        runOnJS(handlePrev)();
      }
      if (translationX.value < prevX.value) {
        runOnJS(handleNext)();
      }
    });

  function handleNavigation() {
    router.push("/CardsSwippable");
  }
  const AnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    };
  });
  useEffect(() => {
    console.log("idx", idx);
  }, [idx]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.container, AnimatedStyles]}>
            {DATA.map((item, index) => {
              const magnifyStyle = useAnimatedStyle(() => {
                return {
                  transform: [
                    {
                      scale: index === idx ? 1.3 : 1,
                    },
                  ],
                };
              });
              return (
                <Animated.View style={[styles.card, magnifyStyle]}>
                  <Text>{item.title}</Text>
                </Animated.View>
              );
            })}
          </Animated.View>
        </GestureDetector>
        <AnimatedCards />

        <Pressable onPress={handleNavigation}>
          <Text>Press me!!!</Text>
        </Pressable>
        <Ball />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    width: widthList,
    marginTop: 50,
    flexDirection: "row",
    marginLeft: -80,
    justifyContent: "flex-start",
    gap: 10,
  },
  card: {
    backgroundColor: "#DAE0E2",
    width: 150,
    margin: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
});
