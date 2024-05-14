
import {ActivityIndicator, Image, View} from 'react-native';
import React, {useState} from 'react';

const ImageLoader = ({
  source,
  containerStyle,
  children,
  imageStyle,
  childrenStyle,
  activityIndicatorStyle,
}) => {
  const [loading, setLoading] = useState(true);


  const onloading = (value) => {
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
      <ActivityIndicator
        size='small'
        color={'red'}
        style={{
          zIndex: 1,
          opacity: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EBF2FC',
          ...styles.absolute,
          ...activityIndicatorStyle,
        }}
      />
    );
  };

  return (
    <View style={{...containerStyle}}>
      {loading && renderActivityIndicator()}
      <Image
        style={{
          height: '100%',
          width: '100%',
          ...imageStyle,
        }}
        source={source}
        onLoadStart={() => onloading(true)}
        onLoadEnd={() => onloading(false)}
      />
      <View
        style={{
          ...styles.absolute,
          ...childrenStyle,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default ImageLoader;
