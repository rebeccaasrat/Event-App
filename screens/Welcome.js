import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export class Welcome extends Component {
  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#F2AFEF', '#F2AFEF']}  
      >
        <View style={{
          paddingHorizontal: 22,
          width: '100%',
        }}>
          <Text style={{
            fontFamily:'MontSerrat',
            fontSize: 40,  
            fontWeight: 'bold',  
            color: '#33186B',  
            textAlign: 'center',
            textShadowColor: 'rgba(255, 255, 255, 0.9)',  
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
          }}>
           CampArada
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

export default Welcome;
