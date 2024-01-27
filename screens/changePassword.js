

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import 'firebase/storage';
import { StorageReference } from 'firebase/storage';
import 'firebase/storage';
import {EmailAuthProvider, getAuth,reauthenticateWithCredential,updatePassword } from 'firebase/auth';

const ChangePassword
 = ({ navigation }) => {
 

  
  const [password, setNewPassword] = useState('');
  const [newpassword, setNewnewPassword] = useState('');


  const addContact = async () => {
      const auth = getAuth()
      const user = auth.currentUser
      const credentail = EmailAuthProvider.credential(user.email,password)
      reauthenticateWithCredential(user ,credentail)
      .then(()=>{

        return updatePassword(user ,newpassword)
      })
      .then(()=>{
        alert("Password updated successfully")
        navigation.navigate('Login');
      })
    
      .catch((error)=>{

        console.log("Errot updating password",error.message)
        alert("Incorrect Please try again")
    })
      
  };

 


  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry 
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          onChangeText={(text) =>setNewnewPassword(text) }
          keyboardType="phone-pad"
          secureTextEntry 
        />
        

       
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    alignContent :"center",
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#3cb548',
    alignSelf:"center"
  },
  contactsContainer: {
    flex: 1,
    marginBottom: 16,
    marginTop:50
  },
  contactCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },
  inputContainer: {
    marginBottom: 16,
    marginTop:'10%'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePassword


