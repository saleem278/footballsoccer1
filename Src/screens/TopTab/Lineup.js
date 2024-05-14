import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IconPath, ImagePath, fonts} from '../../assets';

const Lineup = () => {
  const [selectedTab, setSelectedTab] = useState(true);
  const [secondTabFirstListData] = useState([1, 2, 3, 4, 5, 6]);
  const [secondTabSecondListData] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <View style={styles._container}>
      <View style={styles._tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab(true)}
          style={[
            styles._tabButtonStyle,
            {
              backgroundColor: selectedTab === true ? '#246BFD' : '#F1F1F1',
            },
          ]}>
          <Text
            style={[
              styles._tabButtonText,
              {
                color: selectedTab !== false ? '#fff' : '#939598',
              },
            ]}>
            Manchaster City
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab(false)}
          style={[
            styles._tabButtonStyle,
            {
              backgroundColor: selectedTab == false ? '#246BFD' : '#F1F1F1',
            },
          ]}>
          <Text
            style={[
              styles._tabButtonText,
              {
                color: selectedTab == false ? '#fff' : '#939598',
              },
            ]}>
            Arsenal
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === true ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 6,
              borderColor: '#F3F3F3',
            }}>
            <FlatList
              data={secondTabSecondListData}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F3F3F3',
                    }}>
                    {index === 0 && (
                      <View style={styles._renderItemHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'center',
                            }}
                            source={IconPath.teamfour}
                          />
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 14,
                              fontFamily: fonts.bold,
                              fontWeight: '600',
                              lineHeight: 18,
                              marginLeft: 5,
                            }}>
                            Manchaster City
                          </Text>
                        </View>

                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text style={styles._subText}>4</Text>
                          <Text style={[styles._subText, {}]}>-</Text>
                          <Text style={styles._subText}>2</Text>
                          <Text style={[styles._subText, {}]}>-</Text>
                          <Text style={styles._subText}>3</Text>
                          <Text style={[styles._subText, {}]}>-</Text>
                          <Text style={styles._subText}>1</Text>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // borderBottomWidth: 1,
                        // borderBottomColor: '#F3F3F3',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'center',
                          }}
                          source={ImagePath.userProfile}
                        />
                        <Text
                          style={{
                            color: '#939598E5',
                            fontSize: 12,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 16,
                            paddingHorizontal: 10,
                          }}>
                          35.
                        </Text>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          B. White
                        </Text>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          65'
                        </Text>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'center',
                            marginRight: 20,
                            marginLeft: 5,
                          }}
                          source={IconPath.arrowupdown}
                        />
                        <TouchableOpacity
                          style={{
                            width: 25,
                            // padding: 5,
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: '#067C27',
                            backgroundColor: '#2FA450',
                            height: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 10,
                              fontFamily: fonts.bold,
                              fontWeight: '500',
                              lineHeight: 12,
                            }}>
                            6.8
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: '#F3F3F3',
              marginBottom: 30,
            }}>
            <FlatList
              nestedScrollEnabled
              data={secondTabSecondListData}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderRadius: 6,
                    }}>
                    {index === 0 && (
                      <View
                        style={[
                          styles._renderItemHeader,
                          {backgroundColor: '#F1F1F1'},
                        ]}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: '#181829',
                              fontSize: 14,
                              fontFamily: fonts.bold,
                              fontWeight: '700',
                              lineHeight: 18,
                              marginLeft: 5,
                            }}>
                            SUBSTITUTIONS
                          </Text>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F3F3',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          78'
                        </Text>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'center',
                            marginRight: 20,
                            marginLeft: 5,
                          }}
                          source={IconPath.arrowupdown}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          Allen Saint-Maximin
                        </Text>
                        <Text
                          style={{
                            color: '#939598',
                            fontSize: 12,
                            fontFamily: fonts.bold,
                            fontWeight: '500',
                            lineHeight: 18,
                          }}>
                          Joe Willock
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 6,
              borderColor: '#F3F3F3',
            }}>
            <FlatList
              data={secondTabSecondListData}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F3F3F3',
                    }}>
                    {index === 0 && (
                      <View style={styles._renderItemHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'center',
                            }}
                            source={IconPath.teamthird}
                          />
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 14,
                              fontFamily: fonts.bold,
                              fontWeight: '600',
                              lineHeight: 18,
                              marginLeft: 5,
                            }}>
                            Arsenal
                          </Text>
                        </View>

                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text style={styles._subText}>4</Text>
                          <Text style={[styles._subText, {}]}>-</Text>
                          <Text style={styles._subText}>2</Text>
                          <Text style={[styles._subText, {}]}>-</Text>
                          <Text style={styles._subText}>3</Text>
                          <Text style={[styles._subText, {}]}>-</Text>
                          <Text style={styles._subText}>1</Text>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // borderBottomWidth: 1,
                        // borderBottomColor: '#F3F3F3',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'center',
                          }}
                          source={ImagePath.userProfile}
                        />
                        <Text
                          style={{
                            color: '#939598E5',
                            fontSize: 12,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 16,
                            paddingHorizontal: 10,
                          }}>
                          35.
                        </Text>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          B. White
                        </Text>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          65'
                        </Text>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'center',
                            marginRight: 20,
                            marginLeft: 5,
                          }}
                          source={IconPath.arrowupdown}
                        />
                        <TouchableOpacity
                          style={{
                            width: 25,
                            // padding: 5,
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: '#067C27',
                            backgroundColor: '#2FA450',
                            height: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 10,
                              fontFamily: fonts.bold,
                              fontWeight: '500',
                              lineHeight: 12,
                            }}>
                            6.8
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: '#F3F3F3',
              marginBottom: 30,
            }}>
            <FlatList
              nestedScrollEnabled
              data={secondTabSecondListData}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderRadius: 6,
                    }}>
                    {index === 0 && (
                      <View
                        style={[
                          styles._renderItemHeader,
                          {backgroundColor: '#F1F1F1'},
                        ]}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: '#181829',
                              fontSize: 14,
                              fontFamily: fonts.bold,
                              fontWeight: '700',
                              lineHeight: 18,
                              marginLeft: 5,
                            }}>
                            SUBSTITUTIONS
                          </Text>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F3F3',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          78'
                        </Text>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'center',
                            marginRight: 20,
                            marginLeft: 5,
                          }}
                          source={IconPath.arrowupdown}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#181829',
                            fontSize: 14,
                            fontFamily: fonts.bold,
                            fontWeight: '600',
                            lineHeight: 18,
                          }}>
                          Allen Saint-Maximin
                        </Text>
                        <Text
                          style={{
                            color: '#939598',
                            fontSize: 12,
                            fontFamily: fonts.bold,
                            fontWeight: '500',
                            lineHeight: 18,
                          }}>
                          Joe Willock
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Lineup;

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  _tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  _tabButtonStyle: {
    paddingVertical: 10,
    borderRadius: 4,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  _tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    fontFamily: fonts.bold,
  },
  _subText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    fontFamily: fonts.medium,
    lineHeight: 12,
  },

  _renderItemHeader: {
    backgroundColor: '#023474',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
