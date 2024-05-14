import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {fonts} from '../../assets';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Event from '../TopTab/Event';
import Live from '../TopTab/Live';
import Lineup from '../TopTab/Lineup';
import Stats from '../TopTab/Stats';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const SingleMatch = ({route}) => {
  const item = route?.params.item;
  const Tab = createMaterialTopTabNavigator();
  const routeName = getFocusedRouteNameFromRoute(route);

  return (
    <View style={{flex: 1}}>
      <View style={[styles.itemContainer, {backgroundColor: '#181829'}]}>
        <View style={styles.teamContainer}>
          <Image source={item.imageFirstTeam} style={styles.teamImage} />
          <Text style={styles.teamName}>{item.firstTeam}</Text>
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
            <Text style={styles.vs}>{item?.scoreFirstTeam}</Text>
            <Text style={styles.vs}>-</Text>
            <Text style={styles.vs}>{item?.scoreSecondTam}</Text>
          </View>
          {item?.status === 'Live' ? (
            <Text style={styles.degree}>{item.degree}'</Text>
          ) : (
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.day}>{item.day}</Text>
            </View>
          )}
        </View>
        <View style={styles.teamContainer}>
          <Image source={item.imageSecondTeam} style={styles.teamImage} />
          <Text style={styles.teamName}>{item.secondTeam}</Text>
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="Event"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            color: '#939598',
            textTransform: 'none',
          },
          tabBarStyle: {backgroundColor: '#181829'},
        }}
        tabBar={props => <CustomTabBar {...props} routeName={routeName} />}>
        <Tab.Screen
          name="Event"
          component={Event}
          options={{tabBarLabel: 'Event'}}
        />
        <Tab.Screen
          name="Live"
          component={Live}
          options={{tabBarLabel: 'Live'}}
        />
        <Tab.Screen
          name="Lineup"
          component={Lineup}
          options={{tabBarLabel: 'Lineup'}}
        />
        <Tab.Screen
          name="Stats"
          component={Stats}
          options={{tabBarLabel: 'Stats'}}
        />
      </Tab.Navigator>
    </View>
  );
};

const CustomTabBar = ({state, descriptors, navigation, routeName}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}>
            <Text
              style={{
                color: isFocused ? '#246BFD' : '#939598',
                marginBottom: 20,
                fontSize: 14,
                fontFamily: fonts.medium,
                fontWeight: '600',
              }}>
              {label}
            </Text>
            {isFocused && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SingleMatch;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    // marginBottom: 15,
    width: '100%',
    // height: 200,
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
    color: '#246BFD',
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#181829',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: 50,
    backgroundColor: '#246BFD',
  },
});
