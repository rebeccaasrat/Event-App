
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFirebaseAuth, db } from './firebaseconfig';

const EventRegistration = ({ route }) => {
  const { eventId } = route.params;
  const { user } = useFirebaseAuth();
  const [registered, setRegistered] = useState(false);

  const handleRegisterEvent = async () => {
    try {
      const registrationCollection = db.collection('eventRegistrations');

      const existingRegistration = await registrationCollection
        .where('eventId', '==', eventId)
        .where('userId', '==', user.uid)
        .get();

      if (existingRegistration.empty) {
        await registrationCollection.add({
          eventId,
          userId: user.uid,
          
        });

        setRegistered(true);
      } else {
        console.log('User is already registered for the event.');
      }
    } catch (error) {
      console.error('Error registering for event:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Event Registration</Text>
        <Text style={styles.eventId}>{eventId}</Text>
        {registered ? (
          <Text style={styles.registrationText}>Registered for the Event!</Text>
        ) : (
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterEvent}>
            <Text style={styles.buttonText}>Register for Event</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2E3C8',
  },
  content: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 16,
  },
  eventId: {
    fontSize: 18,
    color: '#4F6F52',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#4F6F52',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#D2E3C8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registrationText: {
    fontSize: 16,
    color: '#4F6F52',
    marginTop: 16,
  },
});

export default EventRegistration;
