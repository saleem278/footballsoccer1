import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconPath} from '../../assets';

const SingleNews = ({route}) => {
  const navigation = useNavigation();
  const item = route?.params?.item;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={IconPath.goback} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.newsTitle}>{'News'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Image source={item.teamIcon} style={styles.newsImage} />
        <View style={styles.info}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.newstitle}>{item.newstitle}</Text>
        </View>
        <Text style={styles.description}>{item.descriptionfirst}</Text>
        <Text style={styles.description}>{item.descriptionsecond}</Text>
        <Text style={styles.description}>{item.descriptionthird}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  newsImage: {
    height: 300,
    marginBottom: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  newstitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 10,
  },
});

export default SingleNews;
