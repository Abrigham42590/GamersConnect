import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReviewListScreen from './screens/ReviewListScreen';
import CalendarScreen from './screens/CalendarScreen';
import FriendsListScreen from './screens/FriendsListScreen';
import StreamersListScreen from './screens/StreamersListScreen';
import RegisterScreen from './screens/RegisterScreen';
// import other screens here as needed

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ReviewList" component={ReviewListScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="FriendsList" component={FriendsListScreen} />
        <Stack.Screen name="StreamersList" component={StreamersListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
