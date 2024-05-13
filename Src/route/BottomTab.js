import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/BottomTab/HomeTab/Home';
import Matches from '../screens/BottomTab/MatchesTab/Matches';
import Result from '../screens/BottomTab/ResultTab/Result';
import News from '../screens/BottomTab/ResultTab/Result';
import {Image, StyleSheet, View} from 'react-native';
import {IconPath} from '../assets';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#246BFD',
        tabBarStyle:{height:50,padding:8}
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  styles.image,
                  {
                    tintColor: focused ? '#246BFD' : '#868686',
                  },
                ]}
                source={IconPath.homeTab}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
          tabBarLabel: 'Matches',
          headerShown: false,

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  styles.image,
                  {
                    tintColor: focused ? '#246BFD' : '#868686',
                  },
                ]}
                source={IconPath.matchesTab}
              />
            </View>
          ),
          tabBarBadgeStyle: {
            backgroundColor: '#246BFD',
          },
        }}
      />
      <Tab.Screen
        name="Result"
        component={Result}
        options={{
          tabBarLabel: 'Result',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  styles.image,
                  {
                    tintColor: focused ? '#246BFD' : '#868686',
                  },
                ]}
                source={IconPath.resultTab}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'News',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  styles.image,
                  {
                    tintColor: focused ? '#246BFD' : '#868686',
                  },
                ]}
                source={IconPath.newsTab}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
