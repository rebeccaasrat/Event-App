import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About campus Event</Text>
      <Text style={styles.description}>
        Welcome to our Campus Event App, where excitement meets organization!
         Our platform is designed to bring our vibrant campus community together, 
         providing a central hub for all the latest and greatest events happening on campus. 
         Whether it's academic conferences, cultural celebrations, or social gatherings, 
         we've got you covered. 
      </Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>   
          Version: 3.0.0
        </Text>
        <Text style={styles.infoText}>
          Author: Rebecca Asrat
        </Text>
        <Text style={styles.infoText}>
          Contact: rebeccaasrat8@gmail.com
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 136,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:"#D2E3C8"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#4F6F52',
    padding: 16,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
});

export default AboutUsScreen;
