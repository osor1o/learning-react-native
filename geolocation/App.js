import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export default () => {
  const [userPosition, setUserPosition] = useState({
    latitude: -9.6450644,
    longitude: -35.7125566,
  });

  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    async function verifyLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          setHasLocationPermission(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }

    verifyLocationPermission();

    if (hasLocationPermission) {
      setInterval(() => {
        Geolocation.getCurrentPosition(
          (position) => {
            if (position.coords.latitude && position.coords.longitude) {
              setUserPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            }
          });
      }, 5 * 1000);
    }
  }, [hasLocationPermission]);

  return (
    <>
      <View style={styles.container}>
         <MapView
          style={styles.map}
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: userPosition.latitude,
            longitude: userPosition.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * ASPECT_RATIO,
          }}
        >
           <Marker
            coordinate={userPosition}
            title="Osório"
            description="quarto"
          />
          <Marker
            coordinate={{
              latitude: userPosition.latitude - 0.01,
              longitude: userPosition.longitude - 0.01,
            }}
            title="Osório2"
            description="sala"
            liteMode
          />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: height -25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 25,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  }
});
