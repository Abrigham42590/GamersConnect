import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/ReviewListScreenStyles'; // Import styles for this screen

const ReviewListScreen = ({navigation}) => {
  const [reviewCompanies, setReviewCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState('');

  const addReviewCompany = () => {
    if (newCompany && reviewCompanies.length < 5) {
      setReviewCompanies([...reviewCompanies, newCompany]);
      setNewCompany('');
    } else {
      alert('You can only add up to 5 companies');
    }
  };

  const removeReviewCompany = index => {
    const updatedCompanies = reviewCompanies.filter((_, i) => i !== index);
    setReviewCompanies(updatedCompanies);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addCompanyContainer}>
        <TextInput
          style={styles.input}
          value={newCompany}
          onChangeText={setNewCompany}
          placeholder="Add a company"
        />
        <Button title="Add" onPress={addReviewCompany} />
      </View>
      <FlatList
        data={reviewCompanies}
        renderItem={({item, index}) => (
          <View key={index} style={styles.reviewCompanyContainer}>
            <Text style={styles.reviewCompanyText}>{item}</Text>
            <TouchableOpacity onPress={() => removeReviewCompany(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default ReviewListScreen;
