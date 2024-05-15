import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {fonts} from '../assets';
import {useNavigation} from '@react-navigation/native';
import ImageLoader from './ImageLoader';

const HomeItem = ({item}) => {
  const navigation = useNavigation();
  console.log(item, 'item');
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SingleMatch', {item: item})}
      style={[
        styles.itemContainer,
        {backgroundColor: !item.match_live ? '#1029AA' : '#ED1645'},
      ]}>
      <View style={styles.teamContainer}>
        <ImageLoader
          source={{uri: item?.teamHomeBadge}}
          style={styles.teamImage}
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
        {item.matchStatus ? (
          <Text style={styles.degree}>{item?.matchStatus}</Text>
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
        />
        <Text style={styles.teamName}>{item.matchAwayteamName}</Text>
      </View>
      {item?.status === 'Live' && (
        <View style={styles.liveContainer}>
          <Text style={styles.live}>Live Now</Text>
        </View>
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
    backgroundColor: '#ED1645',
    borderRadius: 30,
    padding: 4,
    right: 10,
    top: 10,
  },
  live: {
    fontSize: 9,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: 'white',
  },
});

export default HomeItem;
