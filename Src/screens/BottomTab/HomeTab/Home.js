import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import {HomeData, newsData} from '../../../constants/Data';
import HomeItem from '../../../Custom/HomeItem';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, fonts} from '../../../assets';

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const renderItem = ({item, index}) => {
    if (index === 0) {
      return (
        <View
          style={[
            styles.newsItem,
            {
              height: 300,
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'column',
            },
          ]}>
          <View style={{padding: 10,height:300}}>
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
              <Text style={styles.newsSubtitle}>{item.newstitle}</Text>
              <Text style={styles.newsTime}>{item.time}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.newsItem}>
          <Image
            source={item.teamIcon}
            style={[
              styles.newsImage,
              {
                width: 80,
              },
            ]}
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsSubtitle}>{item.newstitle}</Text>
            <Text style={styles.newsTime}>{item.time}</Text>
          </View>
        </View>
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
          data={HomeData}
          style={{width: '95%', alignSelf: 'center'}}
          renderItem={({item, index, separators}) => <HomeItem item={item} />}
        />
        <View style={styles.emptyView}></View>
        <Text style={styles.Topnews}>Top News</Text>
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
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  newsImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  newsSubtitle: {
    marginBottom: 5,
  },
  newsTime: {
    color: 'gray',
  },
});

export default Home;
