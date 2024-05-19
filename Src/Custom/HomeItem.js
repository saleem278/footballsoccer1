import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import {fonts} from '../assets';
import {useNavigation} from '@react-navigation/native';
import ImageLoader from './ImageLoader';

const HomeItem = ({item, index}) => {
  const navigation = useNavigation();
  const even_card = index % 2 == 0;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateZoom = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1, // Scale up to 1.2 times
          duration: 500, // Duration for zoom in
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1, // Scale back to original size
          duration: 500, // Duration for zoom out
          useNativeDriver: true,
        }),
      ]).start(() => {
        animateZoom(); // Repeat the animation
      });
    };

    animateZoom();
  }, [scale]);

  console.log(index, 'index');
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SingleMatch', {item: item})}
      style={[
        styles.itemContainer,
        {backgroundColor: even_card ? '#1029AA' : '#ED1645'},
      ]}>
      <View style={styles.teamContainer}>
        <ImageLoader
          source={{uri: item?.teamHomeBadge}}
          style={styles.teamImage}
          activityIndicatorStyle={{
            backgroundColor: even_card ? '#1029AA' : '#ED1645',
          }}
        />
        <Text style={styles.teamName}>{item.matchHometeamName}</Text>
      </View>
      <View
        style={[
          styles.vsContainer,
          {
            height: 160,
          },
        ]}>
        <Text style={styles.score}>{'Full Time'}</Text>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Text style={styles.vs}>{item?.matchHometeamScore}</Text>
          <Text style={styles.vs}>-</Text>
          <Text style={styles.vs}>{item?.matchAwayteamScore}</Text>
        </View>
        {item?.match_live === 1 ? (
          <Text style={styles.degree}>{item?.matchStatus}'</Text>
        ) : (
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.day}>{item.day}</Text>
          </View>
        )}
      </View>
      <View style={styles.teamContainer}>
        <ImageLoader
          source={{uri: item?.teamAwayBadge}}
          style={styles.teamImage}
          activityIndicatorStyle={{
            backgroundColor: even_card ? '#1029AA' : '#ED1645',
          }}
        />
        <Text style={styles.teamName}>{item.matchAwayteamName}</Text>
      </View>
      {item?.match_live === 1 && (
        // <View
        //   style={[
        //     styles.liveContainer,
        //     {backgroundColor: !even_card ? '#1029AA' : '#ED1645'},
        //   ]}>
        //   <Text style={styles.live}>Live Now</Text>
        // </View>
        <Animated.View
          style={[
            styles.liveContainer,
            {
              backgroundColor: !even_card ? '#1029AA' : '#ED1645',
              transform: [{scale}],
            },
          ]}>
          <Text style={styles.live}>Live Now</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    height: 200,
  },
  teamContainer: {
    alignItems: 'center',
    width: '35%',
  },
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  teamName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: fonts.medium,
  },
  score: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.medium,
  },
  vsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '30%',
  },
  vs: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
  degree: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
  timeContainer: {
    alignItems: 'center',
  },
  time: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: fonts.medium,
    fontWeight: '600',
  },
  day: {
    color: '#FFF',
    fontSize: 8,
    fontFamily: fonts.medium,
    fontWeight: '600',
  },
  teamImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  liveContainer: {
    position: 'absolute',
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 5,
    right: 10,
    top: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  live: {
    fontSize: 9,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: 'white',
  },
});

export default HomeItem;
