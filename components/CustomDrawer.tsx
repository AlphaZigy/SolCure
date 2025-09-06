import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default function CustomDrawer(props: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/wooden_back.png')}
        style={styles.drawerHeader}
      >
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </ImageBackground>
      
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
  },
  drawerHeader: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    borderBottomColor: '#8c8544',
    backgroundColor: '#8c8544',
  },
  logoImage: {
    height: 300,
    width: 300,
  },
  appTitle: {
    fontSize: 22,
    marginVertical: 0,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 0,
    textShadowColor: '#5b0116',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 3,
  },
  inlineIcon: {
    width: 20,
    height: 20,
  },
  appSubtitle: {
    fontSize: 10,
    color: '#0000ff',
    marginVertical: 0,
    marginBottom: 3,
    marginTop: 0,
    fontWeight: 'bold',
  },
  drawerContent: {
    paddingTop: 0,
  },
});
