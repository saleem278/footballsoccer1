import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {fonts} from '../assets';

const MatchItem = ({match}) => {
  const {
    teamfirst,
    teamfirstIcon,
    teamsecond,
    teamsecondIcon,
    teamscore,
    teamsecondscore,
    status,
    time,
    day,
    teamdegree,
  } = match;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <View style={styles.teamColumn}>
          <Image source={teamfirstIcon} style={styles.teamIcon} />
          <Text style={styles.teamName}>{teamfirst}</Text>
        </View>
        <View style={styles.teamColumn}>
          <Image source={teamsecondIcon} style={styles.teamIcon} />
          <Text style={styles.teamName}>{teamsecond}</Text>
        </View>
      </View>
      {teamdegree && (
        <View style={{position: 'absolute', top: 33, right: 40}}>
          <Text style={[styles.degree]}>{teamdegree}'</Text>
        </View>
      )}
      {status ? (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <Text style={[styles.dayTime]}>{` ${day}`}</Text>
          <Text style={styles.dayTime}>{` ${time}`}</Text>
        </View>
      ) : (
        <View style={{}}>
          <Text
            style={[
              styles.matchDetails,
              {
                color: teamdegree ? '#246BFD' : '#181829',
              },
            ]}>{` ${teamscore}`}</Text>
          <Text
            style={[
              styles.matchDetails,
              {
                color: teamdegree ? '#246BFD' : '#181829',
              },
            ]}>{` ${teamsecondscore}`}</Text>
        </View>
      )}
    </View>
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
