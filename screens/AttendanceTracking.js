import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const EventDetails = ({ route, navigation }) => {
  const event = route.params?.event;
  const locations = [
    { id: 1, name: 'Female Dormitory', latitude: 8.214144727194258, longitude: 37.802554582904925 },
    { id: 2, name: 'Stadium', latitude: 8.215139902260223, longitude: 37.802864889077064 },
    { id: 3, name: 'Main Parking', latitude: 8.21410258658027, longitude: 37.8040490501251 },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'About Event',
    });
  }, [navigation]);

  const handleAttendEvent = () => {
    navigation.navigate('EventAttendance', { event: event });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: event?.imageUrl }} style={styles.eventImage} />

      <Text style={styles.title}>{event?.title}</Text>

      <View style={styles.eventInfo}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.text}>{event?.date}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.text}>{event?.time}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{event?.description}</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.215054374168222,
          longitude: 37.80251155191483,
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

      <TouchableOpacity style={styles.attendButton} onPress={handleAttendEvent}>
        <Text style={styles.attendButtonText}>Check Attendees</Text>
      </TouchableOpacity>

      <Button
        title="Go Back"
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.popToTop();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2E3C8',
    padding: 16,
  },
  eventImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 16,
    textAlign: 'center',
  },
  eventInfo: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#4F6F52',
    marginBottom: 8,
  },
  map: {
    flex: 1,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  attendButton: {
    backgroundColor: '#4F6F52',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  attendButtonText: {
    color: '#D2E3C8',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventDetails;
