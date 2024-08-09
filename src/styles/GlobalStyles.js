import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 300,
  },
  input: {
    height: 50,
    width: 300,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: 'red',
    fontSize: 12,
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
  },
});
