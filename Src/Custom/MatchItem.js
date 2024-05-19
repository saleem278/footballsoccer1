import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fonts} from '../assets';
import ImageLoader from './ImageLoader';
import {useNavigation} from '@react-navigation/native';

const MatchItem = ({match}) => {
  const navigation = useNavigation();

  const {
    match_hometeam_name,
    teamHomeBadge,
    match_awayteam_name,
    teamAwayBadge,
    match_hometeam_score,
    match_awayteam_score,
    match_live,
    matchDate,
    matchTime,
    matchStatus,
  } = match;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SingleMatch', {
          item: {
            ...match,
            matchHometeamName: match_hometeam_name,
            matchAwayteamName: match_awayteam_name,
            teamHomeBadge: teamHomeBadge,
            teamAwayBadge: teamAwayBadge,
            matchHometeamScore: match_hometeam_score,
            matchAwayteamScore: match_awayteam_score,
            time: matchTime,
            day: matchDate,
          },
        })
      }
      activeOpacity={0.9}
      style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <View style={styles.teamColumn}>
          <ImageLoader source={{uri: teamHomeBadge}} style={styles.teamIcon} />
          <Text style={styles.teamName}>{match_hometeam_name}</Text>
        </View>
        <View style={styles.teamColumn}>
          <ImageLoader source={{uri: teamAwayBadge}} style={styles.teamIcon} />
          <Text style={styles.teamName}>{match_awayteam_name}</Text>
        </View>
      </View>
      {matchStatus && (
        <View style={{position: 'absolute', top: 33, right: 40}}>
          <Text style={[styles.degree]}>{matchStatus}</Text>
        </View>
      )}
      {!match_live ? (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <Text style={[styles.dayTime]}>{` ${matchDate}`}</Text>
          <Text style={styles.dayTime}>{` ${matchTime}`}</Text>
        </View>
      ) : (
        <View style={{}}>
          <Text
            style={[
              styles.matchDetails,
              {
                color: match_live ? '#246BFD' : '#181829',
              },
            ]}>{` ${match_hometeam_score}`}</Text>
          <Text
            style={[
              styles.matchDetails,
              {
                color: match_live ? '#246BFD' : '#181829',
              },
            ]}>{` ${match_awayteam_score}`}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  teamColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  teamIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    fontFamily: fonts.medium,
  },
  teamName: {
    color: '#181829',
    fontSize: 12,
    marginLeft: 12,
    fontWeight: '500',
  },
  score: {
    fontSize: 12,
    fontWeight: '700',
  },
  degree: {
    fontSize: 12,
    color: '#246BFD',
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
  matchDetails: {
    fontSize: 12,
    color: '#181829',
    fontWeight: '700',
    fontFamily: fonts.medium,
    marginTop: 10,
    marginBottom: 10,
  },
  dayTime: {
    fontSize: 12,
    color: '#868686',
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
});

export default MatchItem;
