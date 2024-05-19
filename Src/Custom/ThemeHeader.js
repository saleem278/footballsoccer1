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
import {IconPath, fonts} from '../assets';

const ThemeHeader = ({
  title,
  iconSource,
  onBackPress,
  onNotifyPress,
  onShareIcon,
  navigation
}) => {
  return (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor: '#181829',
          justifyContent: 'space-between',
        },
      ]}>
      <StatusBar backgroundColor={'#181829'} />
      <TouchableOpacity onPress={onBackPress}>
        <Image
          style={{
            height: 24,
            width: 24,
            resizeMode: 'contain',
            tintColor: '#fff',
          }}
          source={iconSource}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onNotifyPress}>
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
              tintColor: '#fff',
              marginRight: 20,
            }}
            source={IconPath.notification}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShareIcon}>
          <Image
            style={{
              height: 22,
              width: 22,
              resizeMode: 'contain',
              tintColor: '#fff',
            }}
            source={IconPath.shareIcon}
          />
        </TouchableOpacity>
      </View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
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

export default ThemeHeader;
