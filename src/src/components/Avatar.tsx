import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Avatar = ({ uri, size = 100 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image
        source={{ uri }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  image: {
    resizeMode: 'cover',
  },
});

export default Avatar;
