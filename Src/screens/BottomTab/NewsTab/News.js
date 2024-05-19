import React, {useRef, useEffect, useState, useCallback} from 'react';
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
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialHandleMore, setInitailHandleMore] = useState(false);
  const [isLastPage, setLastPage] = useState(false);
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

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prevPageNumber => prevPageNumber + 1);
    }
  }, [hasMore]);

  const handleScroll = ({nativeEvent}) => {
    console.log('kkkkkkkkkkkkkkkkkkkk');
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 80;
    console.log(loading, hasMore, isCloseToBottom);
    if (isCloseToBottom && !loading && hasMore && initialHandleMore) {
      setInitailHandleMore(false);
      handleLoadMore();
    }
  };
  const fetchData = useCallback((page = 1) => {
    console.log(page, 'page');
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(LiveUrl + `api/v1/posts?page=${page}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsedData = JSON.parse(result);
        if (parsedData && parsedData.hasOwnProperty('data')) {
          setLoading(false);
          if (parsedData?.pagination?.last_page === currentPage) {
            setLastPage(true);
          }
          if (page > 1) {
            setNewsData(prevData => [...prevData, ...parsedData.data]);
            setHasMore(page < parsedData?.pagination?.last_page);
          } else {
            setHasMore(page <= parsedData?.pagination?.last_page);
            setNewsData(parsedData?.data);
            setLoading(false);
          }
          setInitailHandleMore(true);
        } else {
          setHasMore(false);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  console.log(currentPage, 'sadfasf');

  useEffect(() => {
    if (focused) {
      setCurrentPage(1);
      setInitailHandleMore(false);
      setHasMore(true);
      setLoading(false);
      setNewsData([]);
      fetchData();
    }
  }, [focused, fetchData]);

  useEffect(() => {
    if (focused) {
      async function currentPageEffect() {
        console.log('sadfasfsdfs');
        if (currentPage > 1 && !loading) {
          fetchData(currentPage);
        }
      }
      currentPageEffect();
    }
  }, [currentPage, focused, fetchData]);

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
              marginBottom: 5,
            }}>
            <ImageLoader
              style={{resizeMode: 'stretch', borderRadius: 8}}
              source={{uri: item?.image}}
            />
          </View>

          <View style={styles.newsContent}>
            <Text
              style={[
                styles.newsTitle,
                {fontFamily: fonts.bold, fontWeight: '500'},
              ]}>
              {item.title}
            </Text>
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
                <Text style={styles.newsSubtitle}>{item.category_name}</Text>
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
              style={{width: 80, borderRadius: 8, height: 80}}
              source={{uri: item?.image}}
            />
          </View>

          <View style={styles.newsContent}>
            <Text style={[styles.newsTitle, {fontSize: 14}]}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.newsSubtitle}>{item.category_name}</Text>
              </View>
              <Text style={styles.newsTime}>{item?.formattedCreatedAt}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderFooter = () => {
    if ((!loading && currentPage > 1) || isLastPage) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
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
      {loading && currentPage == 1 ? (
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
            onScroll={e => {
              Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
                useNativeDriver: false,
              })(e);
              handleScroll(e);
            }}
            scrollEventThrottle={16}>
            <FlatList
              scrollEventThrottle={16}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={() => (
                <>
                  {!loading && (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 400,
                      }}>
                      <Text style={{color: 'black'}}>No News Found</Text>
                    </View>
                  )}
                </>
              )}
              data={newsData}
              renderItem={renderItem}
            />
          </Animated.ScrollView>
        </>
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
    fontSize: 16,
    marginBottom: 5,
    color: '#181829',
  },
  newsSubtitle: {
    marginBottom: 5,
    color: '#181829',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.bold,
  },
  newsTime: {
    color: '#938E8E',
    fontWeight: '600',
    fontFamily: fonts.medium,
    fontSize: 10,
  },
});

export default News;
