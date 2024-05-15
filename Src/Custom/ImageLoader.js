import {ActivityIndicator, Image, View} from 'react-native';
import React, {useState} from 'react';

import {theme} from '../constants';
import {IconPath} from '../assets';

const ImageLoader = ({
  source,
  containerStyle,
  children,
  style,
  childrenStyle,
  activityIndicatorStyle,
}) => {
  const [loading, setLoading] = useState(true);

  const onloading = value => {
    setLoading(value);
  };

  const styles = {
    absolute: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  const renderActivityIndicator = () => {
    return (
      <View
        style={{
          zIndex: 0,
          opacity: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F4F9FF',
          ...styles.absolute,
          ...activityIndicatorStyle,
        }}>
        <Image
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          source={IconPath.info}
        />
      </View>
    );
  };

  return (
    <View style={{...containerStyle}}>
      {loading || !source.uri ? renderActivityIndicator() : null}
      <Image
        style={{
          height: '100%',
          width: '100%',
          ...style,
        }}
        source={source}
        onLoadStart={() => onloading(true)}
        onLoadEnd={() => onloading(false)}
      />
      <View
        style={{
          ...styles.absolute,
          ...childrenStyle,
        }}>
        {children}
      </View>
    </View>
  );
};

export default ImageLoader;
