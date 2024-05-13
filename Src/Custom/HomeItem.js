import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const HomeItem = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.itemContainer,
        {backgroundColor: item.status === 'Live' ? '#1029AA' : '#ED1645'},
      ]}>
      <View style={styles.teamContainer}>
        <Image source={item.imageFirstTeam} style={styles.teamImage} />
        <Text style={styles.teamName}>{item.firstTeam}</Text>
        <Text style={styles.score}>{item.scoreFirstTeam}</Text>
      </View>
      <View style={styles.vsContainer}>
        <Text style={styles.vs}>vs</Text>
        <Text style={styles.degree}>{item.degree}'</Text>
      </View>
      <View style={styles.teamContainer}>
        <Image source={item.imageSecondTeam} style={styles.teamImage} />
        <Text style={styles.teamName}>{item.secondTeam}</Text>
        <Text style={styles.score}>{item.scoreSecondTam}</Text>
      </View>
      {item.time && (
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.day}>{item.day}</Text>
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
  },
  teamContainer: {
    alignItems: 'center',
  },
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  teamName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    color: '#FFF',
    fontSize: 18,
  },
  vsContainer: {
    alignItems: 'center',
  },
  vs: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  degree: {
    color: '#FFF',
    fontSize: 16,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: '#FFF',
    fontSize: 14,
  },
  day: {
    color: '#FFF',
    fontSize: 14,
  },
  teamImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
});

export default HomeItem;
