import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from './AuthProvider';

const SettingsScreen = ({ navigation }) => {


    const { user, signOut } = useAuth(); 

    const handleLogout =() => {
      console.log("SIgnout clicked")
      try {
         signOut();
        navigation.navigate("Login");

      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };



  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {

          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const renderCard = (title, iconName, color, screenName) => (
    <Card style={styles.card} onPress={() => (screenName === 'DeleteAccount' ? handleDeleteAccount() : navigateToScreen(screenName))}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={iconName} size={24} color={color} style={styles.icon} />
        <Text style={{ marginLeft: 16, color: color }}>{title}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {renderCard('Profile', 'account-circle', '#F5F7F8', 'ProfileUser')}
      {renderCard('Security', 'security', '#F5F7F8', 'changePassword')}
      {renderCard('About Us', 'info', '#F5F7F8', 'AboutUsScreen')}
      {renderCard('Delete Account', 'delete', '#F5F7F8', 'DeleteAccount')}
      
      <Card style={styles.card} onPress={() => handleLogout()}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={"logout"} size={24} color={"#F5F7F8"} style={styles.icon} />
        <Text style={{ marginLeft: 16, color: "#F5F7F8" }}>{"Logout"}</Text>
      </Card.Content>
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#D2E3C8', 
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#4F6F52', 
  },
  icon: {
    marginRight: 16,
  },
  cardText: {
    marginLeft: 16,
    color: '#4F6F52', 
  },
  logoutCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#4F6F52', 
  },
  logoutText: {
    marginLeft: 16,
    color: '#D2E3C8', 
  },
});


export default SettingsScreen;
