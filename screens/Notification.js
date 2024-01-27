import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.message}>You have new notifications!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2E3C8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4F6F52',
  },
  message: {
    fontSize: 18,
    color: '#4F6F52',
  },
});

export default NotificationsScreen;
