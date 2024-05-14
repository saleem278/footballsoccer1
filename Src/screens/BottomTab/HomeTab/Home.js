import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  FlatList,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HomeData, newsData} from '../../../constants/Data';
import HomeItem from '../../../Custom/HomeItem';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, fonts} from '../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {LiveUrl} from '../../../backend/env';

const Home = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [dashBoardData, setDashBoardData] = useState([]);
  const [newsTopData, setNewsTopData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nodata, setNodata] = useState(false);
  const useFocused = useIsFocused();
  useEffect(() => {
    // Update StatusBar background color and style based on scroll position
    const listenerId = scrollY.addListener(({value}) => {
      const backgroundColor = value > 50 ? '#edf5ff' : 'white';
      StatusBar.setBackgroundColor(backgroundColor, true);
      StatusBar.setBarStyle(value > 50 ? 'dark-content' : 'dark-content', true);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const ApiFetchData = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(LiveUrl + 'api/v1/dashboard', requestOptions)
      .then(response => response.text())
      .then(result => {
        const parseData = JSON.parse(result);
        console.log(parseData, 'papapa========ffffffF============papapap');
        if (parseData.status === true) {
          setLoading(false);
          setDashBoardData(parseData.data.liveScore);
          setNewsTopData(parseData.data.topNews);
        } else {
          setNodata(true);
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    ApiFetchData();
  }, [useFocused]);
  const renderItem = ({item, index}) => {
    console.log(item, 'item');
    if (index === 0) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SingleNews', {
              item: item,
            })
          }
          activeOpacity={0.9}
          style={[
            styles.newsItem,
            {
              height: 280,
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
            },
          ]}>
          {item?.image === '' ? (
            <View style={{borderWidth: 1, width: '100%', height: 200}}>
              <Image
                source={IconPath?.info}
                style={[
                  styles.newsImage,
                  {
                    width: '100%',
                    height: 200,
                    borderWidth: 1,
                  },
                ]}
              />
            </View>
          ) : (
            <>
              <Image
                source={{uri: item?.image}}
                style={[
                  styles.newsImage,
                  {
                    width: '100%',
                    height: 200,
                  },
                ]}
              />
            </>
          )}
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '70%',
                }}>
                <Image
                  style={{width: 13, height: 13, resizeMode: 'contain'}}
                  source={item?.icon}></Image>
                <Text style={styles.newsSubtitle}>{item.newstitle}</Text>
              </View>
              <Text
                style={[
                  styles.newsTime,
                  {
                    fontSize: 12,
                  },
                ]}>
                {item.formattedCreatedAt}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SingleNews', {
              item: item,
            })
          }
          activeOpacity={0.9}
          style={[
            styles.newsItem,
            {
              marginBottom: 10,
              marginTop: 10,
            },
          ]}>
          <Image
            source={{uri: item?.image}}
            style={[
              styles.newsImage,
              {
                width: 110,
              },
            ]}
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '67%',
                }}>
                <Image
                  style={{width: 13, height: 13, resizeMode: 'contain'}}
                  source={item?.icon}></Image>
                <Text style={styles.newsSubtitle}>{item.description}</Text>
              </View>
              <Text style={styles.newsTime}>{item?.formattedCreatedAt}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="1010Soccer"
        showIcon={true}
        iconSource={IconPath.notification}
        onPress={() => {}}
        scrollY={scrollY}
      />
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <FlatList
          data={dashBoardData}
          style={{width: '95%', alignSelf: 'center'}}
          renderItem={({item}) => <HomeItem item={item} loading={loading} />}
        />
        <View style={styles.emptyView}></View>
        <Text style={styles.Topnews}>Top News</Text>
        <FlatList
          data={newsTopData}
          renderItem={renderItem}
          // keyExtractor={item => item.id.toString()}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  emptyView: {
    borderBottomWidth: 2,
    borderColor: '#F1F1F1',
    width: '100%',
    height: 1,
    marginBottom: 5,
    marginTop: 10,
  },
  Topnews: {
    color: '#181829',
    fontWeight: '700',
    fontFamily: fonts.medium,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#F6F6F6',
    width: '95%',
    alignSelf: 'center',
    marginBottom: 0,
  },
  newsImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    width: '100%',
  },
  newsTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
    color: '#181829',
    fontFamily: fonts.medium,
  },
  newsSubtitle: {
    marginBottom: 5,
    marginLeft: 5,
    color: '#181829',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  newsTime: {
    color: '#938E8E',
    fontWeight: '600',
    fontFamily: fonts.medium,
    fontSize: 10,
  },
});

export default Home;
