import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView,Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from './firebaseconfig';
const HomeScreen = ({ navigation }) => {
    const [challenge, setChallenge] = useState([]);
  const featuredEvent = {
    title: 'About Event!',
    date: 'December 31, 2023',
    time: '7:00 PM',
    location: 'Stadium',
    imageUrl: 'https://placekitten.com/800/400',
  };
   useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const contactsCollection = collection(db, 'events');
        const contactsQuery = query(contactsCollection);
        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsData = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChallenge(contactsData);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);


  const otherEvents = [
    {
      title: 'Event 1',
      date: 'January 15, 2024',
      time: '6:30 PM',
      location: 'Arena',
      imageUrl: 'https://placekitten.com/800/401',
    },
    {
      title: 'Event 2',
      date: 'February 22, 2024',
      time: '5:00 PM',
      location: 'Auditorium',
      imageUrl: 'https://placekitten.com/800/402',
    },
    {
      title: 'Event 3',
      date: 'March 10, 2024',
      time: '8:45 PM',
      location: 'Community Hall',
      imageUrl: 'https://placekitten.com/800/403',
    },
    {
      title: 'Event 4',
      date: 'April 5, 2024',
      time: '4:15 PM',
      location: 'Outdoor Venue',
      imageUrl: 'https://placekitten.com/800/404',
    },
  ];

  const renderEventCard = (event, index) => (
    <TouchableOpacity
      key={index}
      style={styles.eventCardContainer}
      onPress={() => navigation.navigate('EventDetails', { event })}
    >
      <ImageBackground
        source={{ uri: event.image }}
        style={styles.eventCardImage}
      >
        <View style={styles.eventCardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="md-calendar" size={24} color="#D2E3C8" style={styles.eventCardIcon} />
            <Text style={styles.eventCardDateTime}>
              {event.date} at {event.time}
            </Text>
            <Image source={{ uri: event.image }}/>
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#D2E3C8" style={styles.eventCardIcon} />
            <Text style={styles.eventCardLocation}>|</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const navigateToEventCreation = () => {
    navigation.navigate('EventCreation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainerTop}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="person" size={32} color="#4F6F52" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ marginLeft: 20 }}>
          <Ionicons name="settings" size={32} color="#4F6F52" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderEventCard(featuredEvent, 'featured')}
        {challenge.map((event, index) => renderEventCard(event, index))}
      </ScrollView>

      <TouchableOpacity style={styles.createEventIcon} onPress={navigateToEventCreation}>
        <Ionicons name="add-circle" size={64} color="#4F6F52" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2E3C8",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  eventCardContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  eventCardImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  eventCardContent: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  iconContainerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  eventCardIcon: {
    marginRight: 8,
  },
  eventCardDateTime: {
    fontSize: 16,
    color: '#D2E3C8',
  },
  eventCardLocation: {
    fontSize: 16,
    color: '#D2E3C8',
    marginLeft: 8,
  },
  createEventIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default HomeScreen;
