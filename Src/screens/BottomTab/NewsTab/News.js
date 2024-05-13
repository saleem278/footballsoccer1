import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import {newsData} from '../../../constants/Data';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, fonts} from '../../../assets';

const News = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const renderItem = ({item, index}) => {
    if (index === 0) {
      return (
        <View
          style={[
            styles.newsItem,
            {
              height: 280,
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
            },
          ]}>
          <Image
            source={item.teamIcon}
            style={[
              styles.newsImage,
              {
                width: '100%',
                height: 200,
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 13, height: 13, resizeMode: 'contain'}}
                  source={item?.icon}></Image>
                <Text style={styles.newsSubtitle}>{item.newstitle}</Text>
              </View>
              <Text style={styles.newsTime}>{item.time}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.newsItem,
            {
              marginBottom: 10,
              marginTop: 10,
            },
          ]}>
          <Image
            source={item.teamIcon}
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 13, height: 13, resizeMode: 'contain'}}
                  source={item?.icon}></Image>
                <Text style={styles.newsSubtitle}>{item.newstitle}</Text>
              </View>
              <Text style={styles.newsTime}>{item.time}</Text>
            </View>
          </View>
        </View>
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
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
    fontSize: 12,
  },
});

export default News;
