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
} from 'react-native';
import {newsData, resultData} from '../../../constants/Data';
import CustomHeader from '../../../Custom/CustomHeader';
import {IconPath, ImagePath, fonts} from '../../../assets';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MatchItem from '../../../Custom/MatchItem';

const Matches = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeDay, setActiveDay] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date

  useEffect(() => {
    const listenerId = scrollY.addListener(({value}) => {
      const backgroundColor = value > 50 ? '#edf5ff' : 'white';
      StatusBar?.setBackgroundColor(backgroundColor, true);
      StatusBar?.setBarStyle(
        value > 50 ? 'dark-content' : 'dark-content',
        true,
      );
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const handleOpenDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    setSelectedDate(date);
    handleCloseDatePicker();
  };

  const calendarData = [1, 2, 3, 4, 5, 6];

  const currentDate = new Date(); // Get the current date
  const currentDay = currentDate.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  // Array to map numerical representation of day to its short name
  const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function getNextNDaysData(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      const day = (currentDay + i) % 7; // Modulo 7 to ensure we loop through days (0 to 6)
      result.push({date: date.getDate(), day: dayShortNames[day]});
    }
    return result;
  }

  const newData = getNextNDaysData(calendarData.length);

  console.log(newData);
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Matches"
        showIcon={true}
        iconSource={null}
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
          data={newData}
          horizontal
          style={{
            marginTop:10
          }}
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
                  onPress={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        item.date,
                      ),
                    )
                  }
                  style={[
                    styles.activeindexView,
                    {
                      backgroundColor:
                        selectedDate.getDate() === item.date
                          ? '#246BFD'
                          : '#F1F1F1',
                    },
                  ]}>
                  <Text
                    style={[
                      selectedDate.getDate() === item?.date
                        ? styles.dateText
                        : styles.dayText,
                    ]}>
                    {item?.day}
                  </Text>
                  <Text
                    style={[
                      selectedDate.getDate() === item?.date
                        ? styles.dateText
                        : styles.dayText,
                    ]}>
                    {item?.date}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          // keyExtractor={item => item.id.toString()}
        />
        <FlatList
          data={resultData}
          style={{marginBottom:10}}
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
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                  source={item?.icon}></Image>
                <View
                  style={{
                    marginLeft: 8,
                  }}>
                  <Text
                    style={{
                      color: '#23262D',
                      fontWeight: '700',
                      fontSize: 12,
                      fontFamily: fonts.medium,
                    }}>
                    {item.titleplayer}
                  </Text>
                  <Text
                    style={{
                      color: '#979797',
                      fontWeight: '500',
                      fontSize: 12,
                      fontFamily: fonts.medium,
                    }}>
                    {item.teamname}
                  </Text>
                </View>
              </View>
              <FlatList
                data={item.data}
                renderItem={({item}) => <MatchItem match={item} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Animated.ScrollView>
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={selectedDate} // Pass selected date to DateTimePickerModal
          onConfirm={handleConfirmDate} // Update selected date on confirmation
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

export default Matches;
