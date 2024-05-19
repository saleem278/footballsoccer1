import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, fonts} from '../../../assets';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MatchItem from '../../../Custom/MatchItem';
import {LiveUrl} from '../../../backend/env';
import {useIsFocused} from '@react-navigation/native';
import ImageLoader from '../../../Custom/ImageLoader';

const Result = () => {
  const focused = useIsFocused();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateforPicker, setDateForPicker] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prevPageNumber => prevPageNumber + 1);
    }
  }, [hasMore]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator style={{marginTop: 10}} size="large" color="#0000ff" />
    );
  };

  const fetchData = useCallback(
    async (page, reset = false, selectedDate = null) => {
      if (!hasMore) return;

      setLoading(true);

      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        let url = `${LiveUrl}api/v1/eventsresult?page=${page}`;
        if (selectedDate) {
          url = `${LiveUrl}api/v1/eventsresult/${moment(selectedDate).format(
            'DD-MM-YYYY',
          )}?page=${page}`;
        }

        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const parsedData = JSON.parse(result);

        if (parsedData && parsedData.hasOwnProperty('LeageGroups')) {
          const matches = convertAsPerRequirement(parsedData);
          if (reset) {
            setResultsData(matches);
          } else {
            setResultsData(prevData => [...prevData, ...matches]);
          }
          setInitialDataLoaded(true);
          return page < parsedData?.pagination?.last_page;
        } else {
          setResultsData([]);
          return false;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [hasMore, selectedDate],
  );

  useEffect(() => {
    async function firstLoadEffect() {
      if (focused && !initialDataLoaded) {
        let res = await fetchData(1, true);
        setHasMore(res);
      }
    }

    firstLoadEffect();
  }, [focused, initialDataLoaded, fetchData]);

  useEffect(() => {
    async function currentPageEffect() {
      if (currentPage > 1 && !loading) {
        let res = await fetchData(currentPage);
        setHasMore(res);
      }
    }
    currentPageEffect();
  }, [currentPage, fetchData]);

  const handleOpenDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const calendarData = [1, 2, 3, 4, 5, 6];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function getNextNDaysData(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      const day = (currentDay + i) % 7;
      result.push({date: date.getDate(), day: dayShortNames[day]});
    }
    return result;
  }

  const newData = getNextNDaysData(calendarData.length);

  const convertAsPerRequirement = data => {
    return Object.keys(data.LeageGroups).map(key => ({
      'league-name': data.LeageGroups[key]['league-name'],
      'league-logo': data.LeageGroups[key]['league-logo'],
      matches: data.LeageGroups[key].matches,
    }));
  };

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

  const handleScroll = ({nativeEvent}) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 80;

    if (isCloseToBottom && !loading && hasMore) {
      handleLoadMore();
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Result"
        showIcon={true}
        iconSource={null}
        onPress={() => {}}
        scrollY={scrollY}
      />
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
          data={newData}
          horizontal
          style={{marginTop: 10, height: 90}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              {index === 5 ? (
                <TouchableOpacity
                  style={styles.lastIndexView}
                  onPress={handleOpenDatePicker}>
                  <Image
                    source={IconPath.calender}
                    style={{width: 22, height: 22, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    const newSelectedDate = new Date(currentDate);
                    newSelectedDate.setDate(item.date);
                    setSelectedDate(newSelectedDate);
                    setCurrentPage(1);
                    setResultsData([]);
                    setHasMore(true);
                    fetchData(1, true, newSelectedDate);
                  }}
                  style={[
                    styles.activeindexView,
                    {
                      backgroundColor:
                        selectedDate && selectedDate.getDate() === item.date
                          ? '#246BFD'
                          : '#F1F1F1',
                    },
                  ]}>
                  <Text
                    style={[
                      selectedDate && selectedDate.getDate() === item.date
                        ? styles.dateText
                        : styles.dayText,
                    ]}>
                    {item?.day}
                  </Text>
                  <Text
                    style={[
                      selectedDate && selectedDate.getDate() === item.date
                        ? styles.dateText
                        : styles.dayText,
                    ]}>
                    {item?.date}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
        <FlatList
          data={resultsData}
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
                  <Text style={{color: 'black'}}>No Matches Found</Text>
                </View>
              )}
            </>
          )}
          style={{marginBottom: 10, marginTop: 5}}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: 'white',
                width: '95%',
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 4,
                elevation: 2,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: '#ddd',
                }}>
                <ImageLoader
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                  source={item['league-logo']}
                />
                <View style={{marginLeft: 8}}>
                  <Text
                    style={{
                      color: '#23262D',
                      fontWeight: '700',
                      fontSize: 12,
                      fontFamily: fonts.medium,
                    }}>
                    {item['league-name']}
                  </Text>
                  <Text
                    style={{
                      color: '#979797',
                      fontWeight: '500',
                      fontSize: 12,
                      fontFamily: fonts.medium,
                    }}>
                    {item.matches[0].countryName}
                  </Text>
                </View>
              </View>
              <FlatList
                data={item.matches}
                renderItem={({item}) => <MatchItem match={item} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        />
      </Animated.ScrollView>
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={selectedDate ? selectedDate : dateforPicker}
          onConfirm={date => {
            setDatePickerVisibility(false);
            setSelectedDate(date);
            setCurrentPage(1);
            setResultsData([]);
            setHasMore(true);
            fetchData(1, true, date);
          }}
          onCancel={handleCloseDatePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  lastIndexView: {
    backgroundColor: '#E0EAFF',
    borderRadius: 15,
    padding: 10,
    height: 70,
    width: 55,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    opacity: 0.9,
  },
  activeindexView: {
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    padding: 10,
    height: 70,
    width: 60,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
  dayText: {
    color: '#939598',
    fontWeight: '600',
    fontFamily: fonts.medium,
    fontSize: 14,
  },
});

export default Result;
