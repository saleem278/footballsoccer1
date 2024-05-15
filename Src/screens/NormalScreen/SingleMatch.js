import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {IconPath, fonts} from '../../assets';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Event from '../TopTab/Event';
import Live from '../TopTab/Live';
import Lineup from '../TopTab/Lineup';
import Stats from '../TopTab/Stats';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ThemeHeader from '../../Custom/ThemeHeader';

const SingleMatch = ({route, navigation}) => {
  const item = route?.params.item;
  const Tab = createMaterialTopTabNavigator();
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log('---item---hshhshhshsh------asd--------->>>>>>>>>>>', item);

  return (
    <View style={{flex: 1}}>
      <ThemeHeader
        title="Matches"
        showIcon={true}
        iconSource={IconPath.goback}
        onBackPress={() => navigation?.goBack()}
      />
      <View style={{backgroundColor: '#181829'}}>
        <Text style={styles.score}>{'Full Time'}</Text>
        <View style={[styles.itemContainer]}>
          <View style={styles.teamContainer}>
            <Image
              source={{uri: item.teamHomeBadge}}
              style={styles.teamImage}
            />
            <Text style={styles.teamName}>{item.matchHometeamName}</Text>
          </View>

          <View
            style={[
              styles.vsContainer,
              {
                // padding:20
                height: 135,
                // paddingVertical:10
              },
            ]}>
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
            {item?.matchStatus ? (
              <Text style={styles.degree}>{item?.matchStatus}'</Text>
            ) : (
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.day}>{item.day}</Text>
              </View>
            )}
          </View>
          <View style={styles.teamContainer}>
            <Image
              source={{uri: item.teamAwayBadge}}
              style={styles.teamImage}
            />
            <Text style={styles.teamName}>{item.matchAwayteamName}</Text>
          </View>
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
          initialParams={{id: item?.eventId}}
        />
        {/* <Tab.Screen
          name="Live"
          component={Live}
          options={{tabBarLabel: 'Live'}}
        /> */}
        <Tab.Screen
          name="Lineup"
          component={Lineup}
          options={{tabBarLabel: 'Lineup'}}
          initialParams={{id: item?.eventId}}

        />
        {/* <Tab.Screen
          name="Stats"
          component={Stats}
          options={{tabBarLabel: 'Stats'}}
        /> */}
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
    width: '100%',
    paddingVertical: 15,
  },
  teamContainer: {
    alignItems: 'center',
    width: '35%',
    paddingVertical: 10,
  },
  teamImage: {
    width: 48,
    height: 48,
    // borderRadius: 25,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  teamName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.medium,
    lineHeight: 18,
    marginBottom: 16,
  },
  score: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.medium,
    textAlign: 'center',
    lineHeight: 12,
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
    marginBottom: 8,
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
