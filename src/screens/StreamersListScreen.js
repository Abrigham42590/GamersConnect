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

const StreamersListScreen = ({navigation}) => {
  const [streamers, setStreamers] = useState([]);
  const [newStreamer, setNewStreamer] = useState('');

  const addStreamer = () => {
    if (newStreamer && streamers.length < 10) {
      setStreamers([...streamers, newStreamer]);
      setNewStreamer('');
    } else {
      alert(
        'You can only add up to 10 streamers, and the field must not be empty',
      );
    }
  };

  const removeStreamer = index => {
    const updatedStreamers = streamers.filter((_, i) => i !== index);
    setStreamers(updatedStreamers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addStreamerContainer}>
        <TextInput
          style={styles.input}
          value={newStreamer}
          onChangeText={setNewStreamer}
          placeholder="Add a streamer"
        />
        <Button title="Add" onPress={addStreamer} />
      </View>
      <FlatList
        data={streamers}
        renderItem={({item, index}) => (
          <View key={index} style={styles.streamerContainer}>
            <Text style={styles.streamerText}>{item}</Text>
            <TouchableOpacity onPress={() => removeStreamer(index)}>
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
  addStreamerContainer: {
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
  streamerContainer: {
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
  streamerText: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default StreamersListScreen;
