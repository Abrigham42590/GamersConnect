import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const FriendsListScreen = ({navigation}) => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  const addFriend = () => {
    if (newFriend && friends.length < 10) {
      setFriends([...friends, newFriend]);
      setNewFriend('');
    } else {
      alert(
        'You can only add up to 10 friends, and the field must not be empty',
      );
    }
  };

  const removeFriend = index => {
    const updatedFriends = friends.filter((_, i) => i !== index);
    setFriends(updatedFriends);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addFriendContainer}>
        <TextInput
          style={styles.input}
          value={newFriend}
          onChangeText={setNewFriend}
          placeholder="Add a friend"
        />
        <Button title="Add" onPress={addFriend} />
      </View>
      <FlatList
        data={friends}
        renderItem={({item, index}) => (
          <View key={index} style={styles.friendContainer}>
            <Text style={styles.friendText}>{item}</Text>
            <TouchableOpacity onPress={() => removeFriend(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  addFriendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  friendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  friendText: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default FriendsListScreen;
