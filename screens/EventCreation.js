import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection,query,getDocs } from 'firebase/firestore';
import { db } from './firebaseconfig';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const CreateEventScreen = ({ navigation }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [longitude, setLongitude] = useState('');

  const handleDateTimeChange = (event, selected) => {
    setShowDateTimePicker(false);

    if (selected) {
      setSelectedDateTime(selected);
    }
  };

    const sendNotification = async () => {
    try {
  
      const userres =query( collection(db, 'User'));
      const UsersSnapshot = await getDocs(userres);
      UsersSnapshot.forEach(async (userDoc) => {
        if(userDoc.data().token){
          const { token } = userDoc.data();

        
          console.log("retoken ",token)

        try {
          console.log("token ",token);
          await Notifications.scheduleNotificationAsync({
            content: {
              to: token,
              title: `New Event.`,
              body: ` Created Successfully`,
              data: {
     
              },
              sound: "default",
            },
            trigger: { seconds: 2 },r
          });
         
        } catch (error) {
          console.error("Error scheduling notification:", error);
        }
      }
      });
    } catch (error) {
      console.error("Error sending notifications to employees:", error);
    }
  };


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const isValidLatitude = !isNaN(parseFloat(latitude)) && isFinite(latitude);
      const isValidLongitude = !isNaN(parseFloat(longitude)) && isFinite(longitude);

      const storage = getStorage();
      const fileRef = `images/${Date.now()}.jpg`;
      const storageRef = ref(storage, fileRef);

      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      sendNotification()

      if (!isValidLatitude || !isValidLongitude) {
        console.error('Invalid latitude or longitude');
        return;
      }

      const eventsCollection = collection(db, 'events');

      await addDoc(eventsCollection, {
        title: eventTitle,
        time: selectedDateTime.toLocaleString(),
        description: eventDescription,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        image:downloadUrl
      });

      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Event</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileCircle}>
              <Text style={styles.profileImageText}>Choose Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={eventTitle}
          onChangeText={(text) => setEventTitle(text)}
        />

        <TouchableOpacity onPress={() => setShowDateTimePicker(true)} style={styles.input}>
          <Text>{selectedDateTime.toLocaleString()}</Text>
        </TouchableOpacity>

        {showDateTimePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={handleDateTimeChange}
          />
        )}

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Event Description"
          multiline
          value={eventDescription}
          onChangeText={(text) => setEventDescription(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="numeric"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2E3C8',
    paddingTop: 60,
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 16,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#D2E3C8',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#4F6F52',
    width: '100%',
  },
  createButton: {
    backgroundColor: '#4F6F52',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#D2E3C8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePicker: {
    alignItems: 'center',
  },
  profileImage: {
    width: 470,
    height: 160,
  },
  profileCircle: {
    width: 470,
    height: 160,
    backgroundColor: '#4F6F52',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 16,
    color: '#D2E3C8',
  },
});

export default CreateEventScreen;
