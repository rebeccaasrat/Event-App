import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from './AuthProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, useFirebaseAuth } from './firebaseconfig'; 

const ProfileUser = ({ navigation }) => {
  const { user } = useAuth();
  const [me, setMe] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const contactsCollection = collection(db, "User");
      const contactsQuery = query(contactsCollection, where('email', '==', `${user}`));
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMe( contactsData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    console.log(user)
  }, []);

  return (
    me && me.length > 0 && ( 
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{me[0].username}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{me[0].email}</Text>

          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.text}>{me[0].role}</Text>
        </View>
        <Button
          title="Edit Profile"
          onPress={() => {
            navigation.navigate('EditProfile', { user:me });
          }}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2E3C8',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 16,
    marginLeft: 0,
    textAlign: 'left',
  },
  profileInfo: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F6F52',
  },
  text: {
    fontSize: 16,
    color: '#4F6F52',
    marginBottom: 8,
  },
});

export default ProfileUser;
