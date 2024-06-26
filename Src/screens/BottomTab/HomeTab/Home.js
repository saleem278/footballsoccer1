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
  ActivityIndicator,
  Alert,
} from 'react-native';
import {HomeData, newsData} from '../../../constants/Data';
import HomeItem from '../../../Custom/HomeItem';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, fonts} from '../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {LiveUrl} from '../../../backend/env';
import ImageLoader from '../../../Custom/ImageLoader';

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
        if (parseData.status === true) {
          setDashBoardData(parseData.data.liveScore);
          setNewsTopData(parseData.data.topNews);
          setLoading(false);
        } else {
          Alert.alert('status false');
          setLoading(false);
          setNodata(true);
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert("Warning",JSON.stringify(error));
        console.error(error);
      });
  };

  useEffect(() => {
    ApiFetchData();
  }, [useFocused]);

  const renderItem = ({item, index}) => {
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
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              borderWidth: 2,
              width: '100%',
              height: 200,
              borderColor: '#F6F6F6',
              borderRadius: 15,
              marginBottom:5
            }}>
            <ImageLoader
              style={{resizeMode: 'stretch',borderRadius:8,}}
              source={{uri: item?.image}}
            />
          </View>

          <View style={styles.newsContent}>
            <Text style={[styles.newsTitle,{fontFamily:fonts.bold}]}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.newsSubtitle}>{item?.category_name}</Text>
              </View>
              <Text
                style={[
                  styles.newsTime,
                  {
                    fontSize: 12,
                  },
                ]}>
                {item?.formattedCreatedAt}
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
              paddingVertical: 10,
            },
          ]}>
          <View
            style={{
              borderWidth: 2,
              width: 80,
              height: 80,
              borderColor: '#F6F6F6',
              marginRight: 10,
              borderRadius: 15,
            }}>
            <ImageLoader
              style={{width: 80,borderRadius:8, height: 80}}
              source={{uri: item?.image}}
            />
          </View>

          <View style={styles.newsContent}>
            <Text style={[styles.newsTitle,{fontSize:12}]}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.newsSubtitle}>{item?.category_name}</Text>
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
        showIcon={false}
        iconSource={IconPath.notification}
        onPress={() => {}}
        scrollY={scrollY}
      />
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'#ED1645'}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 70,
            bottom: 0,
            right: 0,
            left: 0,
          }}></ActivityIndicator>
      ) : (
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
            renderItem={({item, index}) => (
              <HomeItem index={index} item={item} loading={loading} />
            )}
          />
          <View style={styles.emptyView}></View>
          <Text style={styles.Topnews}>Top News</Text>
          <FlatList
            data={newsTopData}
            renderItem={renderItem}
            // keyExtractor={item => item.id.toString()}
          />
        </Animated.ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 14,
    marginBottom: 5,
    color: '#181829',
  },
  newsSubtitle: {
    marginBottom: 5,
    color: '#181829',
    fontSize: 10,
    fontFamily: fonts.bold,
  },
  newsTime: {
    color: '#938E8E',
    fontWeight: '600',
    fontFamily: fonts.medium,
    fontSize: 10,
  },
});

export default Home;
