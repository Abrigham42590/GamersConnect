import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    Alert.alert('Date Selected', `You selected ${day.dateString}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'blue',
          arrowColor: 'blue',
        }}
      />
      <View style={styles.eventContainer}>
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
        <Button
          title="Add Event"
          onPress={() => Alert.alert('Add Event', 'Event added')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  eventContainer: {
    padding: 20,
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CalendarScreen;
