import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import {fonts} from '../assets';

const CustomHeader = ({
  title,
  iconSource,
  onPress,
  scrollY,
  showIcon,
  style,
  resetButton,
  handleResetClick,
}) => {
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['white', '#edf5ff'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        style,
        styles.header,
        {
          backgroundColor: headerBackgroundColor,
          justifyContent: showIcon || resetButton ? 'space-between' : 'center',
        },
      ]}>
      <StatusBar backgroundColor={headerBackgroundColor} />
      <Text style={styles.title}>{title}</Text>
      {resetButton && (
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: 'white',
            borderRadius: 8,
            elevation: 8,
          }}
          onPress={handleResetClick}>
          <Text style={{color: '#34363D', fontSize: 12, fontWeight: '400'}}>
            Reset
          </Text>
        </TouchableOpacity>
      )}
      {showIcon && (
        <TouchableOpacity onPress={onPress}>
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
              tintColor: '#200E32',
            }}
            source={iconSource}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F5F5',
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#181829',
    fontFamily: fonts.spaceGrotesk,
    lineHeight: 30,
  },
});

export default CustomHeader;
