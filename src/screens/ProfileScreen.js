import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import styles from '../styles/ProfileScreenStyles'; // Import global styles

const ProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [media, setMedia] = useState([
    // Placeholder data for media (images and videos)
    {id: '1', uri: 'https://via.placeholder.com/150', type: 'image'},
    {id: '2', uri: 'https://via.placeholder.com/150', type: 'image'},
    {id: '3', uri: 'https://via.placeholder.com/150', type: 'image'},
    {id: '4', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video'},
    {id: '5', uri: 'https://via.placeholder.com/150', type: 'image'},
    {id: '6', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video'},
  ]);

  const selectProfileImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source);
      }
    });
  };

  const renderItem = ({item}) => {
    if (item.type === 'image') {
      return (
        <View style={styles.gridItem}>
          <Image source={{uri: item.uri}} style={styles.gridImage} />
        </View>
      );
    } else if (item.type === 'video') {
      return (
        <View style={styles.gridItem}>
          <Video
            source={{uri: item.uri}}
            style={styles.gridImage}
            resizeMode="cover"
            repeat
            muted
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.reviewBoxButton}
        onPress={() => navigation.navigate('ReviewList')}>
        <Text style={styles.reviewBoxButtonText}>Review Platforms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => navigation.navigate('Calendar')}>
        <Text style={styles.calendarButtonText}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.friendsListButton}
        onPress={() => navigation.navigate('FriendsList')}>
        <Text style={styles.friendsListButtonText}>Friends List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.streamersListButton}
        onPress={() => navigation.navigate('StreamersList')}>
        <Text style={styles.streamersListButtonText}>Streamers List</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={selectProfileImage}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile Image{'\n'}goes here</Text>
      </View>

      <FlatList
        data={media}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
