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
import styles from '../styles/GlobalStyles';

function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({username: '', password: ''});

  const handleLogin = () => {
    if (!username || !password) {
      setErrors({
        username: username ? '' : 'Username is required',
        password: password ? '' : 'Password is required',
      });
      return;
    }
    console.log('Logging in:', username);
    // Add your login logic here, possibly including API calls
    Alert.alert('Login Successful', `Welcome, ${username}!`);
    navigation.navigate('Profile');
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
