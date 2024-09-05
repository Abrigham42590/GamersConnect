import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileScreenStyles';

const ProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [media, setMedia] = useState([]);

  // Fetch user's media on component mount
  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('authToken');

        const response = await fetch(
          `http://10.0.2.2:3000/users/${userId}/media`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setMedia(data.media); // Assuming the backend returns an array of media
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch media:', errorText);
          Alert.alert('Error', 'Failed to load media.');
        }
      } catch (error) {
        console.error('Error fetching media:', error);
        Alert.alert('Error', 'An error occurred while fetching media.');
      }
    };

    fetchUserMedia();
  }, []);

  // Function to select and upload media
  const selectMedia = () => {
    const options = {
      mediaType: 'mixed',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled media picker');
      } else if (response.errorCode) {
        console.log('MediaPicker Error: ', response.errorMessage);
      } else {
        const selectedMedia = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName || asset.uri.split('/').pop(),
        }));

        setMedia([...media, ...selectedMedia]);

        // Upload each selected media to the backend
        for (let mediaItem of selectedMedia) {
          const formData = new FormData();
          formData.append('mediaFile', {
            uri: mediaItem.uri,
            name: mediaItem.fileName,
            type: mediaItem.type,
          });

          try {
            const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            const res = await fetch('http://10.0.2.2:3000/users/addUserMedia', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });

            if (!res.ok) {
              const text = await res.text();
              console.error('Unexpected response:', text);
              throw new Error(`Server responded with status ${res.status}`);
            }

            const data = await res.json();
            console.log('Upload successful:', data);
          } catch (err) {
            console.error('Upload error:', err);
            Alert.alert('Upload Error', 'Failed to upload media.');
          }
        }
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
            resizeMode="cover"
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
            resizeMode="cover"
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
        data={media}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
