import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconPath, fonts} from '../../assets';
import ImageLoader from '../../Custom/ImageLoader';
import RenderHTML from 'react-native-render-html';

const SingleNews = ({route}) => {
  const navigation = useNavigation();
  const item = route?.params?.item;

  const handleLinkOpen = async url => {
    try {
      const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
      if (supported) {
        await Linking.openURL(url); // It will open the URL on browser.
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={IconPath.goback} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.newsTitle}>{'News'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.excerpt}</Text>
        {item?.contentType === 1 ? (
          <ImageLoader source={{uri: item?.image}} style={styles.newsImage} />
        ) : (
          <TouchableOpacity
            onPress={() => handleLinkOpen(item?.url)}
            activeOpacity={0.9}>
            <ImageLoader
              style={styles.newsImage}
              source={{uri: item?.videoThumbnail}}
            />
          </TouchableOpacity>
        )}
        {item?.content_source && (
          <Text style={styles.source_text}>Source: {item?.content_source}</Text>
        )}
        <RenderHTML
          baseStyle={styles.description}
          source={{html: item.description}}
        />
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
  source_text: {
    // textAlign: 'right',
    color: '#000',
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
    height: 180,
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 8,
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
