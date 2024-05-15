import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconPath, fonts} from '../../assets';
import {resultData} from '../../constants/Data';
import MatchItem from '../../Custom/MatchItem';
import {useIsFocused} from '@react-navigation/native';
import {LiveUrl} from '../../backend/env';

const Event = ({route}) => {
  const isFocused = useIsFocused();
  const id = route?.params?.id;
  const [matchEventData, setMatchEventData] = useState([]); 
  const ApiFetchData = async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(LiveUrl + 'api/v1/event/' + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsedData = JSON.parse(result);
        setMatchEventData(parsedData?.data);
        
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    ApiFetchData();
  }, [isFocused]);

  return (
    <View style={styles._Container}>
      <Text style={styles._matchEvent}>Match Event</Text>
      {/* <FlatList
        data={matchEventData}
        style={{marginBottom: 10}}
        renderItem={({item}) => (
          ( */}
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
            source={{uri: matchEventData?.leagueLogo}}></Image>
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
              {matchEventData.leagueName}
            </Text>
            <Text
              style={{
                color: '#979797',
                fontWeight: '500',
                fontSize: 12,
                fontFamily: fonts.medium,
              }}>
              {matchEventData.countryName}
            </Text>
          </View>
        </View>
        {/* -------------------------- */}
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <View style={styles.teamColumn}>
              <Image
                source={{uri: matchEventData?.teamHomeBadge}}
                style={styles.teamIcon}
              />
              <Text style={styles.teamName}>{matchEventData?.match_hometeam_name}</Text>
            </View>
            <View style={styles.teamColumn}>
              <Image
                source={{uri: matchEventData?.teamAwayBadge}}
                style={styles.teamIcon}
              />
              <Text style={styles.teamName}>
                {matchEventData?.match_awayteam_name}
              </Text>
            </View>
          </View>
          {matchEventData?.matchStatus && (
            <View style={{position: 'absolute', top: 33, right: 40}}>
              <Text style={[styles.degree]}>
                {matchEventData?.matchStatus}'
              </Text>
            </View>
          )}

          <View style={{}}>
            <Text
              style={[
                styles.matchDetails,
                {
                  color: matchEventData?.matchStatus ? '#246BFD' : '#181829',
                },
              ]}>{` ${matchEventData?.match_hometeam_score}`}</Text>
            <Text
              style={[
                styles.matchDetails,
                {
                  color: matchEventData?.matchStatus ? '#246BFD' : '#181829',
                },
              ]}>{` ${matchEventData?.match_awayteam_score}`}</Text>
          </View>
        </View>
        {/* <FlatList
                data={item.data}
                renderItem={({item}) => <MatchItem match={item} />}
                keyExtractor={(item, index) => index.toString()}
              /> */}
      </View>

      <View
        style={{
          backgroundColor: 'white',
          width: '95%',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 4,
          elevation: 2,
          paddingVertical: 5,
        }}>
        <Text
          style={[
            styles._matchEvent,
            {
              marginTop: 10,
              fontSize: 14,
              paddingHorizontal: 10,
            },
          ]}>
          Event Date/Time
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#F1F1F1',
            paddingVertical: 4,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4,
            }}>
            <Text style={[styles.dayTime, {marginRight: 10}]}>Date:</Text>
            <Text style={[styles.dayTime]}>{matchEventData?.matchDate}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.dayTime, {marginRight: 10}]}>Time:</Text>
            <Text style={styles.dayTime}>{matchEventData?.matchTime}</Text>
          </View>
        </View>
      </View>

      {/* )
        )}
        keyExtractor={item => item.id.toString()}
      /> */}

      {/* <View style={styles._renderItemCard}>
        <FlatList
          data={[1]}
          renderItem={({item, index}) => {
            return (
              <View>
                <View
                  style={[
                    styles._commonStyle,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: '#F1F1F1',
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#F1F1F1',
                    },
                  ]}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: '70%',
                      alignSelf: 'flex-end',
                    }}>
                    <Text
                      style={[
                        styles._headingText,
                        {color: '#246BFD', marginLeft: 14},
                      ]}>
                      81'
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text style={styles._subText}>1</Text>
                      <Text style={[styles._subText, {paddingHorizontal: 10}]}>
                        -
                      </Text>
                      <Text style={styles._subText}>1</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles._commonStyle,
                    {
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#F1F1F1',
                    },
                  ]}>
                  <View
                    style={{
                      width: '30%',
                      borderBottomWidth: 1,
                      borderBottomColor: '#F1F1F1',
                    }}></View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: '70%',
                      alignSelf: 'flex-end',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        width: '100%',
                      }}>
                      <Text style={styles._headingText}>68'</Text>
                      <View
                        style={{
                          backgroundColor: '#F0DC28',
                          width: 20,
                          height: 25,
                          borderRadius: 2,
                          marginLeft: 20,
                        }}></View>
                      <Text style={[styles._headingText, {marginLeft: 15}]}>
                        R. Holding
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: 8,
                      }}>
                      <Text style={styles._headingText}>63'</Text>
                      <View
                        style={{
                          backgroundColor: '#F0DC28',
                          width: 20,
                          height: 25,
                          borderRadius: 2,
                          marginLeft: 20,
                        }}></View>
                      <Text style={[styles._headingText, {marginLeft: 15}]}>
                        B. Saka
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles._borderWidth, {paddingHorizontal: 10}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text style={[styles._headingText, {marginLeft: 15}]}>
                      63'
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                      }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                        }}
                        source={IconPath.arrowupdown}
                      />
                    </View>
                    <View>
                      <Text style={[styles._headingText, {marginLeft: 15}]}>
                        R. Holding
                      </Text>
                      <Text
                        style={[
                          styles._headingText,
                          {marginLeft: 15, color: '#939598'},
                        ]}>
                        M. Ødegaard
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles._borderWidth}>
                  <View
                    style={{
                      width: '65%',
                      alignSelf: 'flex-end',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10,
                      }}>
                      <View>
                        <Text style={[styles._headingText, {}]}>
                          I. Gundogan
                        </Text>
                        <Text style={[styles._headingText, {color: '#939598'}]}>
                          Gabriel Jesus
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                        }}>
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            resizeMode: 'contain',
                          }}
                          source={IconPath.arrowupdown}
                        />
                      </View>
                      <Text style={[styles._headingText, {marginLeft: 15}]}>
                        63'
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles._borderWidth, {paddingHorizontal: 10}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text style={[styles._headingText, {marginLeft: 20}]}>
                      59'
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                      }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                        }}
                        source={IconPath.fouCard}
                      />
                    </View>
                    <View>
                      <Text style={[styles._headingText]}>Gabriel</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styles._commonStyle,
                    {
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#F1F1F1',
                    },
                  ]}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        width: '65%',
                      }}>
                      <View
                        style={{
                          marginLeft: 25,
                        }}>
                        <Text style={[styles._headingText, {marginLeft: 20}]}>
                          R. Mahrez
                        </Text>
                        <Text
                          style={[
                            styles._headingText,
                            {marginLeft: 20, color: '#939598'},
                          ]}>
                          Penalty
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 10,
                        }}>
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            resizeMode: 'contain',
                          }}
                          source={IconPath.bx_football}
                        />
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingVertical: 8,
                          borderBottomWidth: 1,
                          borderBottomColor: '#F1F1F1',
                          width: '100%',
                        }}>
                        <View>
                          <Text style={[styles._headingText, {marginLeft: 14}]}>
                            57'
                          </Text>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text style={styles._subText}>1</Text>
                            <Text
                              style={[
                                styles._subText,
                                {paddingHorizontal: 10},
                              ]}>
                              -
                            </Text>
                            <Text style={styles._subText}>1</Text>
                          </View>
                        </View>

                        <View
                          style={{
                            backgroundColor: '#F0DC28',
                            width: 20,
                            height: 25,
                            borderRadius: 2,
                            marginLeft: 20,
                          }}></View>
                        <Text style={[styles._headingText, {marginLeft: 15}]}>
                          Gabriel
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        width: '68%',
                        alignItems: 'flex-start',
                        alignSelf: 'flex-end',
                      }}>
                      <View>
                        <Text style={[styles._headingText, {}]}>55'{'  '}</Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#F0DC28',
                          width: 20,
                          height: 25,
                          borderRadius: 2,
                          marginLeft: 20,
                        }}></View>
                      <Text style={[styles._headingText, {marginLeft: 15}]}>
                        G. Xhaka
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles._borderWidth]}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '90%',
                    }}>
                    <View style={{}}>
                      <Text style={[styles._headingText]}>Half Time</Text>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginLeft: 10,
                          paddingVertical: 5,
                        }}>
                        <Text style={styles._subText}>1</Text>
                        <Text
                          style={[styles._subText, {paddingHorizontal: 10}]}>
                          -
                        </Text>
                        <Text style={styles._subText}>1</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles._borderWidth]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      width: '61%',
                      alignSelf: 'flex-end',
                      paddingVertical: 10,
                    }}>
                    <View style={{}}>
                      <Text style={[styles._headingText, {marginLeft: 14}]}>
                        31'
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles._subText}>1</Text>
                        <Text
                          style={[styles._subText, {paddingHorizontal: 10}]}>
                          -
                        </Text>
                        <Text style={styles._subText}>1</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                      }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                        }}
                        source={IconPath.bx_football}
                      />
                    </View>
                    <View>
                      <Text style={[styles._headingText, {}]}>B. Saka</Text>
                      <Text style={[styles._headingText, {color: '#939598'}]}>
                        K. Tierney
                      </Text>
                    </View>
                  </View>
                </View>

                <Text
                  style={[
                    styles._headingText,
                    {
                      color: '#939598',
                      alignSelf: 'flex-end',
                      alignItems: 'flex-start',
                      width: '61%',
                      paddingVertical: 10,
                    },
                  ]}>
                  Kick off
                </Text>
              </View>
            );
          }}
        />
      </View> */}
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  _Container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  _matchEvent: {
    fontSize: 16,
    fontFamily: fonts.bold,
    fontWeight: '600',
    color: '#000',
    // lineHeight:16
  },
  _renderItemCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F1F1F1',
    elevation: 1,
    marginBottom: 56,
  },
  _commonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  _headingText: {
    fontSize: 14,
    color: '#181829',
    fontWeight: '600',
    fontFamily: fonts.medium,
    lineHeight: 20,
  },
  _subText: {
    fontSize: 12,
    color: '#64666B',
    fontWeight: '700',
    fontFamily: fonts.medium,
    lineHeight: 12,
  },

  _borderWidth: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  teamColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  teamIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    fontFamily: fonts.medium,
  },
  teamName: {
    color: '#181829',
    fontSize: 12,
    marginLeft: 12,
    fontWeight: '500',
  },
  score: {
    fontSize: 12,
    fontWeight: '700',
  },
  degree: {
    fontSize: 12,
    color: '#246BFD',
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
  matchDetails: {
    fontSize: 12,
    color: '#181829',
    fontWeight: '700',
    fontFamily: fonts.medium,
    marginTop: 10,
    marginBottom: 10,
  },
  dayTime: {
    fontSize: 12,
    color: '#868686',
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
});
