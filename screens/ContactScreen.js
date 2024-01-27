import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, styles.inputWithBackground]}
          placeholder="Your Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input, styles.inputWithBackground]}
          placeholder="Your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.inputWithBackground, styles.messageInput]}
          placeholder="Your Message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2AFEF',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#33186B',
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#F2AFEF', 
    borderRadius: 8,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#33186B',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    color: '#33186B', 
  },
  inputWithBackground: {
    backgroundColor: '#F2AFEF', 
  },
  messageInput: {
    height: 80,
  },
  submitButton: {
    backgroundColor: '#33186B',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
