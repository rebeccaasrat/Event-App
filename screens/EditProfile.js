import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from './firebaseconfig';
import { collection,doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const EditProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [username, setEmail] = useState(user[0].username);
    const [selectedImage, setSelectedImage] = useState(user[0].Image);
  const userDocRef = doc(db, 'User', user[0].id);
  const handleSaveChanges = () => {
    alert('Profile changes saved!');
    console.log(user[0].email)
      update(userDocRef , username,selectedImage)

    navigation.goBack();
  };
    const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
     
      setSelectedImage(result.uri);
    }
  };
    const update =(userDocRef,username,selectedImage)=>{

     setDoc(userDocRef, { username ,Image:selectedImage}, { merge: true })
    .then(async () => {
      const contactsCollection = collection(db, "User");
      const contactsQuery =  query(contactsCollection, where('email', '==', `${user[0].email}`));
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData  =  contactsSnapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
      }));
     

       
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });
  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.profileInfo}>
  <View >
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.imagespicertext}>Pick an image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
    </View>

        <Text style={styles.label}>UserName:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        {/* <Text style={styles.label}>Bio:</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={(text) => setBio(text)}
          multiline
        /> */}
      </View>
      <Button
        title="Save Changes"
        onPress={handleSaveChanges}
      />
    </View>
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
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  bioInput: {
    height: 80, 
  },
    imageContainer: {
    marginTop: 20,
    alignSelf:"center"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imagespicertext: {
    fontSize: 18,
    color: 'blue',
  },
});

export default EditProfile;
