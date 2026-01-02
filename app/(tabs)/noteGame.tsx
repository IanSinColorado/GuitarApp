import { Text, View, StyleSheet, Pressable, FlatList, useWindowDimensions } from 'react-native';
 import { Link } from 'expo-router'; 
import Svg, { Line, Circle, Text as SvgText, G } from "react-native-svg";
import FretboardDiagram from '../components/FretboardDiagram';

export default function Index() {
  const { width } = useWindowDimensions();
  const height = width * 0.5; // keep an aspect ratio

  const random_item = (item: any[]) => item[Math.floor(Math.random()*item.length)];

  const allNotesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const allNotesFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
  
  const notePositions: {string: number; fret: number}[] = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 13; j++) {
            notePositions.push({string: i, fret: j});
        }
    }

  const choices: {id: string, note: string}[] = [
    {id: '1', note: 'A'},
    {id: '2', note: 'A#'},
    {id: '3', note: 'B'}, 
    {id: '4', note: 'C'},
  ];

  const renderChoice = ({item}: {item: {id: string, note: string}}) => (
    <Pressable
      style={styles.answerOption}
      onPress={() => alert(`You selected ${item.note}`)}
    >
      <Text style={{color: '#fff', textAlign: 'center'}}>{item.note}</Text>
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.text}>Note Game</Text>
      <Link href="/" style={styles.button}>
        Home
      </Link>
      <View style={{width: '90%', height: height, alignItems:"center", justifyContent:"center"}}>
        <FretboardDiagram numFrets={12} highlightedNotes={[]} />
      </View>
      <View style={{width: '90%', height: 100, justifyContent: 'center'}}>
        <Pressable
            style={[styles.button2, { backgroundColor: '#fff' }]}
            onPress={() => alert('You pressed "Start Game"!')}>
            <Text style={{ color: '#000', fontSize: 20 }}>Start Game</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      data={choices}
      renderItem={renderChoice}
      keyExtractor={item => item.id}
      numColumns={4}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatlist}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  button2: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  answerOption: {
    fontSize: 25,
    backgroundColor: '#444',
    color: '#fff',
    padding: 5,
    margin: 5,
  }
  ,
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  flatlist: {
    flex: 1,
    backgroundColor: '#25292e',
  }
});
