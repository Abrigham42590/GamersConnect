import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadContainer: {
    flex: -5,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 120,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  grid: {
    alignItems: 'center',
  },
  gridItem: {
    margin: 5,
  },
  gridImage: {
    width: 100,
    height: 100,
  },

  reviewBoxButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  reviewBoxButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  calendarButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  calendarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Add this to your styles
  uploadButton: {
    marginVertical: 20, // Space between other elements
    padding: 10, // Padding inside the button
    top: -65,
    backgroundColor: '#28a745', // A green color for the upload button
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center the text inside the button
  },

  uploadButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold', // Bold text
  },

  friendsListButton: {
    position: 'absolute',
    top: 250,
    left: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  friendsListButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  streamersListButton: {
    position: 'absolute',
    top: 250,
    right: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  streamersListButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
