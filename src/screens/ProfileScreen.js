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
  const [media, setMedia] = useState([]);

  const selectMedia = () => {
    const options = {
      mediaType: 'mixed', // This allows both images and videos
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled media picker');
      } else if (response.errorCode) {
        console.log('MediaPicker Error: ', response.errorMessage);
      } else {
        const selectedMedia = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
        }));
        setMedia([...media, ...selectedMedia]); // Append new media to the existing array
      }
    });
  };

  const renderItem = ({item}) => {
    if (item.type.startsWith('video')) {
      return (
        <View style={styles.gridItem}>
          <Video
            source={{uri: item.uri}}
            style={styles.gridImage}
            resizeMode="cover" // This is fine for videos to maintain aspect ratio
            repeat
            muted
          />
        </View>
      );
    } else if (item.type.startsWith('image')) {
      return (
        <View style={styles.gridItem}>
          <Image
            source={{uri: item.uri}}
            style={styles.gridImage}
            resizeMode="cover" // Optional, use if you want images to be resized similarly
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
        <TouchableOpacity onPress={selectMedia}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile Image{'\n'}goes here</Text>
      </View>

      <View style={styles.uploadContainer}>
        <TouchableOpacity onPress={selectMedia} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Media</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={media} // The media state holds all selected images and videos
        renderItem={renderItem} // Render each media item
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        numColumns={3} // Display in a grid with 3 columns
        contentContainerStyle={styles.grid} // Style for the grid container
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
