import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {LiveData} from '../../constants/Data';
import {IconPath, fonts} from '../../assets';

const Live = ({}) => {
  const renderItem = ({item, index}) => (
    <View style={styles.eventContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.score}>{item.score}</Text>

        <View
          style={{
            position: 'absolute',
            top: 18,
            alignItems: 'center',
            height: '70%',
          }}>
          {(item.status || item?.cardstatus) && (
            <View>
              <Image
                style={{
                  width: item?.status ? 18 : 20,
                  height: item?.status ? 18 : 30,
                  resizeMode: 'contain',
                  marginBottom: 6,
                }}
                source={item?.status ? IconPath.arrowupdown : item.cardicon}
              />
            </View>
          )}
          <View
            style={{
              height: item?.status
                ? item?.cardstatus
                  ? '80%'
                  : '90%'
                : '60%',
              backgroundColor: '#939598',
              width: 2,
            }}
          />
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.scorename,
            {
              color: index === 0 ? '#939598' : '#181829',
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              fontFamily: fonts.medium,
            },
          ]}>
          {item.scorename}
        </Text>

        {item.subscorename && (
          <Text style={styles.subscorename}>{item.subscorename}</Text>
        )}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
          {item.manIcon && (
            <Image source={item.manIcon} style={styles.manIcon} />
          )}
        </View>
        {item.inplayer && item.outplayer && (
          <View style={styles.playerContainer}>
            <Text
              style={{
                color: '#2B881C',
                fontSize: 12,
                textAlign: 'right',
                fontWeight: '600',
                fontFamily: fonts.medium,
              }}>
              PLAYER IN
            </Text>
            <View style={styles.playerColumn}>
              <Text>{item.inplayer}</Text>
              <Image source={item.inplayerimage} style={styles.playerImage} />
            </View>
            <Text
              style={{
                color: '#EE2323',
                fontSize: 12,
                textAlign: 'right',
                fontWeight: '600',
                fontFamily: fonts.medium,
              }}>
              PLAYER OUT
            </Text>
            <View style={styles.playerColumn}>
              <Text>{item.outplayer}</Text>
              <Image source={item.outplayerimage} style={styles.playerImage} />
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={LiveData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

export default Live;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative', // To position the line
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    // borderBottomWidth: 1,
    borderColor: 'gray ',
  },
  score: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
    color: '#181829',
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  scorename: {
    fontSize: 16,
  },
  subscorename: {
    fontSize: 10,
    color: '#939598',
    fontWeight: '500',
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom:5
  },
  description: {
    fontSize: 12,
    width: '90%',
    fontWeight: '400',
    color: '#181829',
    fontFamily: fonts.medium,
    marginBottom: 10,
  },
  playerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 5,
    width: '100%',
  },
  playerColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginRight: 20,
  },
  playerImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    borderRadius: 50,
    marginVertical: 5,
  },
  manIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    borderRadius: 50,
    // marginTop: 5,
  },
  cardstatus: {
    fontSize: 14,
    color: 'red',
  },
});
