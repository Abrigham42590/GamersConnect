import React, {useState} from 'react';
import {SafeAreaView, TextInput, Button, Alert} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
      });

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          Alert.alert(
            'Registration Successful',
            'Please log in with your new account.',
          );
          navigation.navigate('Login'); // Redirect to Login screen
        } else {
          Alert.alert(
            'Registration Failed',
            data.message || 'An error occurred.',
          );
        }
      } else {
        // Handle unexpected content types (e.g., HTML error pages)
        const text = await response.text();
        console.error('Unexpected response:', text);
        Alert.alert('Registration Failed', 'Unexpected response from server.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
