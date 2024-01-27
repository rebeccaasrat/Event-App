import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationScreen = () => {
  const locations = [
    { id: 1, name: 'Female Dormitory', latitude:8.214144727194258,  longitude: 37.802554582904925 },
    { id: 2, name: 'Stadium', latitude: 8.215139902260223, longitude: 37.802864889077064},
    { id: 3, name: 'Main Parking', latitude: 8.21410258658027,  longitude: 37.8040490501251},
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:8.215054374168222, 
          longitude: 37.80251155191483 ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
          />
        ))}
      </MapView>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Nearby Locations</Text>
        {locations.map((location) => (
          <Text key={location.id} style={styles.locationItem}>
            {location.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2E3C8',
  },
  map: {
    flex: 1,
    height: Dimensions.get('window').height / 2,
  },
  listContainer: {
    padding: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  locationItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default LocationScreen;
