import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconPath, fonts} from '../../assets';

const Event = () => {
  return (
    <View style={styles._Container}>
      <Text style={styles._matchEvent}>Match Event</Text>
      <View style={styles._renderItemCard}>
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
      </View>
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
});
