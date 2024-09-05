import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/GlobalStyles';

function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({username: '', password: ''});

  const handleLogin = async () => {
    if (!username || !password) {
      setErrors({
        username: username ? '' : 'Username is required',
        password: password ? '' : 'Password is required',
      });
      return;
    }

    try {
      // Send login credentials to the backend
      const response = await fetch('http://10.0.2.2:3000/users/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}), // Sending login data
      });

      const data = await response.json();

      if (response.ok) {
        // Ensure userId and token are received from the backend
        const {userId, token} = data;

        // Store the userId and token in AsyncStorage
        await AsyncStorage.setItem('userId', userId.toString()); // Convert userId to string for storage
        await AsyncStorage.setItem('authToken', token);

        // Show a success message
        Alert.alert('Login Successful', `Welcome, ${username}!`);

        // Navigate to the Profile screen
        navigation.navigate('Profile');
      } else {
        // Handle login failure (e.g., incorrect username/password)
        console.error('Login failed:', data);
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Login Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>GamerConnect</Text>

        <TextInput
          style={[styles.input, errors.username ? styles.inputError : null]}
          onChangeText={text => {
            setUsername(text);
            setErrors({...errors, username: ''});
          }}
          value={username}
          placeholder="Username"
        />
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          onChangeText={text => {
            setPassword(text);
            setErrors({...errors, password: ''});
          }}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <Button title="Login" onPress={handleLogin} />

        <Text
          style={styles.linkText}
          onPress={() =>
            Alert.alert('Reset Username', 'Link to reset username')
          }>
          Forgot Username?
        </Text>

        {/* Add "Create Account" link to navigate to RegisterScreen */}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Register')} // Navigates to RegisterScreen
        >
          Create Account
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
