import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 

import FretboardDiagram from '../components/FretboardDiagram';

export default function DiagramScreen() {
  const notePositions: {string: number; fret: number}[] = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 13; j++) {
            notePositions.push({string: i, fret: j});
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Fretboard Diagram</Text>
      <View style={styles.fretboard}>
        <FretboardDiagram numFrets={12} highlightedNotes={notePositions}/>
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
    alignContent:'center',
    position:'absolute',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  }
});