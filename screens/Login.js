import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from './AuthProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from './firebaseconfig';

const Login = ({ navigation }) => {
  const { login,user } = useAuth();

    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")
    const[loading,setLoading]=useState(false)
    const handleLogin = async () => {



 try {
     
       if( await login(email, password) ){

          navigation.navigate('TabsPage');
        }
      
      setemail('')
      setpassword('')
    } catch (error) {
      console.error("Login error:", error.message);
     
    }


  };





  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = async () => {
     {
    navigation.navigate('Signup');

   }
  };

  return (
    <LinearGradient colors={['#D2E3C8', '#D2E3C8']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setpassword(text)}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={[styles.forgotPassword, { color: '#4F6F52' }]}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signUp, { color: '#4F6F52' }]}>Or SignUp?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
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
  },
  forgotPassword: {
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#4F6F52', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#D2E3C8', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signUp: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default Login;