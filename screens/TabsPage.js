import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import EventListing from './EventListings';
import HomeScreen from './HomeScreen';
import LocationScreen from './LocationScreen';
import ContactScreen from './ContactScreen';
import Notification from './Notification';
import SettingsScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const TabsPage = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Ionicons name="ios-home" size={26} color={"#4F6F52"}/> 
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: () => (
            <Ionicons name="ios-notifications" size={26} color={"#4F6F52"}/> 
          ),
        }}
      />

      <Tab.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{
          tabBarLabel: 'Location',
          tabBarIcon: () => (
            <Ionicons name="ios-navigate" size={26} color={"#4F6F52"}/> 
          ),
        }}
      />

      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Ionicons name="ios-settings" size={26} color={"#4F6F52"}/> 
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsPage;
