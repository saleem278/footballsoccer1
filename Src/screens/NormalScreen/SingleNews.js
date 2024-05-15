import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconPath, fonts} from '../../assets';
import ImageLoader from '../../Custom/ImageLoader';
import RenderHTML from 'react-native-render-html';

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
        <Text style={styles.subtitle}>{item.excerpt}</Text>
        <ImageLoader source={{uri: item.image}} style={styles.newsImage} />
        <RenderHTML
          // style={styles.description}
          
          baseStyle={styles.description}
          source={{html: item.description}}
        />
        {/* <Text style={styles.description}>{item.descriptionsecond}</Text>
        <Text style={styles.description}>{item.descriptionthird}</Text> */}
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
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181829',
    fontFamily: fonts.medium,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: fonts.medium,
    color: '#181829',
  },
  subtitle: {
    fontSize: 12,
    color: '#979797',
    fontWeight: '500',
    fontFamily: fonts.medium,
    marginBottom: 10,
  },
  newsImage: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 15,
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
    fontSize: 12,
    color: '#979797',
    fontWeight: '500',
    fontFamily: fonts.medium,
    marginBottom: 30,
  },
});

export default SingleNews;
