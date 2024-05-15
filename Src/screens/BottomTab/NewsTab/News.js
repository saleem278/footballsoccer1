import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {newsData} from '../../../constants/Data';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, fonts} from '../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {LiveUrl} from '../../../backend/env';
import ImageLoader from '../../../Custom/ImageLoader';

const News = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const focused = useIsFocused();
  useEffect(() => {
    const listenerId = scrollY.addListener(({value}) => {
      const backgroundColor = value > 50 ? '#edf5ff' : 'white';
      StatusBar.setBackgroundColor(backgroundColor, true);
      StatusBar.setBarStyle(value > 50 ? 'dark-content' : 'dark-content', true);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const fetchData = () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(LiveUrl + 'api/v1/posts?page=1?per_page=40', requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsedData = JSON.parse(result);
        if (parsedData) {
          setLoading(false);
          setNewsData(parsedData.data);
        } else {
          setLoading(false);
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [focused]);

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
              height: 280,
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
            }}>
            <ImageLoader source={{uri: item?.image}} />
          </View>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '70%',
                }}>
                <Image
                  style={{width: 13, height: 13, resizeMode: 'contain'}}
                  source={item?.icon}></Image>
                <Text style={[styles.newsSubtitle]}>{item.newstitle}</Text>
              </View> */}
              <Text
                style={[
                  styles.newsTime,
                  {
                    fontSize: 12,
                  },
                ]}>
                {item.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('SingleNews', {
              item: item,
            })
          }
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
              style={{width: 80, height: 80}}
              source={{uri: item?.image}}
            />
          </View>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '65%',
                }}>
                <Image
                  style={{width: 13, height: 13, resizeMode: 'contain'}}
                  source={item?.icon}></Image>
                <Text style={styles.newsSubtitle}>{item.newstitle}</Text>
              </View> */}
              <Text style={styles.newsTime}>{item.formattedCreatedAt}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="News"
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
        <>
          <Animated.ScrollView
            style={styles.scrollView}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            <FlatList data={newsData} renderItem={renderItem} />
          </Animated.ScrollView>
        </>
      )}
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

export default News;
