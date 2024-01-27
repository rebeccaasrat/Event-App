// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const EventListing = ({ navigation }) => {
//   const [events, setEvents] = useState([
//     { id: '1', title: 'Event 1', date: '2023-12-25', description: 'Description for Event 1' },
//     { id: '2', title: 'Event 2', date: '2023-12-27', description: 'Description for Event 2' },
//     { id: '3', title: 'Event 3', date: '2023-12-29', description: 'Description for Event 3' },
//     { id: '4', title: 'Event 4', date: '2023-12-31', description: 'Description for Event 4' },
//   ]);

//   const handleEventPress = (event) => {
//     alert(`Pressed: ${event.title}`);
//   };

//   const renderEventItem = ({ item }) => (
//     <TouchableOpacity style={styles.eventItem} onPress={() => handleEventPress(item)}>
//       <Text style={styles.eventTitle}>{item.title}</Text>
//       <Text style={styles.eventDate}>{item.date}</Text>
//       <Text style={styles.eventDescription}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <LinearGradient colors={['#F2AFEF', '#F2AFEF']} style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Upcoming Events</Text>
//         <FlatList
//           data={events}
//           keyExtractor={(item) => item.id}
//           renderItem={renderEventItem}
//           style={styles.eventList}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     width: '80%',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#33186B',
//     marginBottom: 16,
//   },
//   eventList: {
//     marginTop: 16,
//   },
//   eventItem: {
//     backgroundColor: '#F2AFEF',
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 8,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#33186B',
//   },
//   eventDate: {
//     color: '#33186B',
//     marginTop: 8,
//   },
//   eventDescription: {
//     color: '#33186B',
//     marginTop: 8,
//   },
// });

// export default EventListing;
