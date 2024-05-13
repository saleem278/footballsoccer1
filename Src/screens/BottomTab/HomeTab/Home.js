import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {HomeData} from '../../../constants/Data';
import HomeItem from '../../../Custom/HomeItem';

const Header = ({scrollY}) => {
  const headerBackgroundColor = scrollY.current.interpolate({
    inputRange: [0, 50],
    outputRange: ['white', '#edf5ff'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
      <Text style={styles.title}>1010Soccer</Text>
    </Animated.View>
  );
};

const Home = () => {
  const scrollY = useRef(new Animated.Value(0));

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <FlatList
          data={HomeData}
          style={{width: '95%', alignSelf: 'center'}}
          renderItem={({item, index, separators}) => <HomeItem item={item} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10, // Adjust this value as needed
    // paddingHorizontal: 20,
    height: 60, // Adjust this value as needed
    borderBottomWidth: 1,
    borderBottomColor: '#F6F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 60, // Adjust this value to avoid content being overlapped by header
  },
});

export default Home;
