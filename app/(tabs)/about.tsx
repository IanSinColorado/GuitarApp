import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 

import FretboardDiagram from '../components/FretboardDiagram';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>About screen</Text>
      <View style={styles.fretboard}>
        <FretboardDiagram numFrets={2} highlightedNotes={[{string:0, fret:0, notShow:false}, {string:1, fret:1, notShow:true}]}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  fretboard:{
    width:"90%",
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  }
});