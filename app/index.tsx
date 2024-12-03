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
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import MagnifyItem from "../Components/MagnifyItem";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useRef } from "react";
import AnimatedCards from "../Components/AnimatedCards";
import CardsThreeD from "../Components/CardsThreeD";
import Ball from "../Components/Ball";
import { Link, useRouter } from "expo-router";

const { width } = Dimensions.get("window");
export default function App() {
  const router = useRouter();
  const DATA = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));
  const scrollX = useSharedValue(0);
  const initialOffsetX = width * 0.3; //used this to giv it an initial offset so that the item gets shown in the center of the screen with some parts of the prev and next items showing next to it
  const SPACING = width * 0.54;
  const flatListRef = useRef(null);
  function handleNavigation() {
    router.push("/CardsSwippable");
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={DATA}
          renderItem={({ item, index }) => (
            <MagnifyItem item={item} index={index} scrollX={scrollX} />
          )}
          snapToInterval={width * 0.6}
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{
          //   paddingHorizontal: SPACING, // Center the first and last items
          // }}
          onScroll={(event) => {
            scrollX.value = event.nativeEvent.contentOffset.x; //here we are updating the scroll position
            //Tried this to make the the flatlist scroll the whole width so that the next item is always centered but this didnt work
            //  const contentOffsetX = event.nativeEvent.contentOffset.x;
            // const itemWidth = width; // Width of each item
            // const index = Math.round(contentOffsetX / itemWidth); // Determine the current item index
            // const centeredOffsetX = index * itemWidth - (SPACING / 2); // Calculate the centered offset
            // scrollX.value = centeredOffsetX; // Update scroll position to center the item
          }}
          contentOffset={{ x: SPACING, y: 0 }}
        />

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
