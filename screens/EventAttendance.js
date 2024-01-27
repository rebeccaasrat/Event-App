
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseconfig';

const AdminPage = ({ route, navigation }) => {
  const [attendees, setAttendees] = useState([]);
   const event = route.params?.event;

useEffect(() => {
    const fetchAttendees = async () => {
      console.log(event.id)
      try {
    
        const usersCollection = collection(db, 'User');
        const usersQuery = query(usersCollection, where('events', 'array-contains', event.id));
        const usersSnapshot = await getDocs(usersQuery);

        const attendeesData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAttendees(attendeesData);
      } catch (error) {
        console.error('Error fetching attendees:', error.message);
      }
    };

    fetchAttendees();
  }, [event]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Attendees</Text>
      <FlatList
        data={attendees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
    <TouchableOpacity style={styles.card} >
      <Image source={{ uri: item.Image}} style={styles.contactImage} />
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactName}>{item.email}</Text>
        
      </View>

    </TouchableOpacity>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 16,
    textAlign: 'center',
  },
  attendeeItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  }, contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
});

export default AdminPage;
