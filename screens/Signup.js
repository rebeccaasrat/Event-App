import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth, db } from './firebaseconfig'; 
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import RNPickerSelect from 'react-native-picker-select';
import { setDoc, addDoc, collection } from 'firebase/firestore';
const SignUp = ({ navigation }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [username, setConfirmPassword] = useState('');
  const { firebase_auth } = useFirebaseAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const[Role,SetRole] =useState(null);
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

  const handleSignUp = async () => {
    try {


      const storage = getStorage();
      const fileRef = `images/${Date.now()}.jpg`;
      const storageRef = ref(storage, fileRef);

      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);


      await addDoc(collection(db, 'User'), {
        email: email,
        Image:downloadUrl,
        username: username,
        role:"user",events : [],

      });
      await createUserWithEmailAndPassword(firebase_auth, email, password);

      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <LinearGradient colors={['#D2E3C8', '#D2E3C8']} style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileCircle}>
              <Text style={styles.profileImageText}></Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
          <Text>Add profile picture</Text>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="username "
          value={username}
          onChangeText={(text) => setConfirmPassword(text)}
        />
         
        {/* <View style={styles.fieldcontainer}>
          <Text style={styles.label}>Role:

          </Text>
          <RNPickerSelect
          placeholder={{label:"Select Role",value:null}}
          onValueChange={(value) => SetRole(value)}
          items={[
            {label:"admin",value:"Admin"},
            {label:"User",value:"User"}

          ]}
          />
        </View> */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4F6F52',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 16,
    color: '#D2E3C8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F6F52',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#4F6F52',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    borderRadius: 8,
    color: '#4F6F52',
    width: '100%',
  },
  signUpButton: {
    backgroundColor: '#4F6F52',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#D2E3C8',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignUp;
