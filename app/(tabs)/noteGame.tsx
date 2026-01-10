import { Text, View, StyleSheet, Pressable, FlatList, useWindowDimensions } from 'react-native';
 import { Link } from 'expo-router'; 
import FretboardDiagram from '../components/FretboardDiagram';
import React, {useState, useEffect} from 'react';

export default function Index() {
  const { width } = useWindowDimensions();
  const height = width * 0.5; // keep an aspect ratio

  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{string: number; fret: number; note: string, notShow?: boolean}[]>([]);
  const [choices, setChoices] = useState<{id: string, note: string}[]>([{id: '1', note: 'A'}, {id: '2', note: 'B'},{id: '3', note: 'C'},{id: '4', note: 'D'}]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const random_item = (item: any[]) => item[Math.floor(Math.random()*item.length)];

  const generateQuestion = () => {
    const string = Math.floor(Math.random() * 6);
    const fret = Math.floor(Math.random() * 12);
    const note = notesOnFrets[string][fret === 0 ? 0 : fret];
    setCurrentQuestion([{string, fret, note: note, notShow: true}]);
    return {string, fret, note: note};
  };

  const generateAnswers = (correctNote: string) => {
    // Build a set of unique note names (strings), then map to choice objects
    const noteSet = new Set<string>();
    noteSet.add(correctNote);
    while (noteSet.size < 4) {
      const randomNote = random_item(allNotesSharp);
      noteSet.add(randomNote);
    }
    const answers = Array.from(noteSet);
    // Shuffle answers so correct isn't always first
    answers.sort(() => Math.random() - 0.5);
    setChoices(answers.map(n => ({ id: n, note: n })));
    return answers;
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentAnswer('');
    const question = generateQuestion();
    generateAnswers(question.note);
  }

  const choiceSelected = (note: string) => {
    setCurrentAnswer(note);
    const correct = currentQuestion[0]?.note;
    if (!correct) {
      alert('No active question.');
      return;
    }
    if (note === correct) {
      alert('Correct!');
      setCurrentStreak(currentStreak + 1);
    } else {
      alert(`Wrong! The correct answer was ${correct}. Your streak was ${currentStreak}.`);
      setCurrentStreak(0);
    }
    startGame();
  }

  const resetGame = () => {
    setGameStarted(false);
    setCurrentAnswer('');
    setCurrentStreak(0);
    setCurrentQuestion([]);
    setChoices([{id: '1', note: 'A'}, {id: '2', note: 'B'},{id: '3', note: 'C'},{id: '4', note: 'D'}]);
  }

  const allNotesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const allNotesFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

  const notesOnFrets = [
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],
    ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],
    ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"],
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
  ];
  
  const notePositions: {string: number; fret: number}[] = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 13; j++) {
            notePositions.push({string: i, fret: j});
        }
    }

  const renderChoice = ({item}: {item: {id: string, note: string}}) => (
    <Pressable
      style={[styles.answerOption, { width: width * 0.20, height: width *  0.1, justifyContent: 'center' }]}
      onPress={() => choiceSelected(item.note)}
    >
      <Text style={{color: '#fff', textAlign: 'center', fontSize: 25}}>{item.note}</Text>
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.text}>Note Game</Text>
      <Link href="/" style={styles.button}>
        Home
      </Link>
      {
      gameStarted ? (
        <View style={{width: width * 0.9, height: height * 0.9, alignItems:"center", justifyContent:"center"}}>
          <FretboardDiagram numFrets={currentQuestion[0]?.fret || 12} highlightedNotes={currentQuestion} />
        </View>
      ) : <View style={{width: width * 0.9, height: height * 0.3, alignItems:"center", justifyContent:"center"}}>
          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>Press "Start Game" to begin! You will be shown a note on the fretboard, and you must select the correct note name from the options below.</Text>
        </View>
      }
      {
      !gameStarted ? (
        <View style={{width: width * 0.5, height: height * 0.1, justifyContent: 'center'}}>
          <Pressable
              style={[styles.button2, { backgroundColor: '#fff' }]}
              onPress={() => startGame()}>
              <Text style={{ color: '#000', fontSize: 20 }}>Start Game</Text>
          </Pressable>
        </View>
      ) : null
      }
    </View>
  );

  return (
    <View style={{flex:1, backgroundColor: '#25292e', alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={choices}
        renderItem={renderChoice}
        keyExtractor={item => item.id}
        numColumns={4}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatlist}
      />
      {
      gameStarted ? (
        <View style={{width: width * 0.5, height: height * 0.1, justifyContent: 'center'}}>
          <Pressable
              style={[styles.button2, { backgroundColor: '#fff' }]}
              onPress={() => resetGame()}>
              <Text style={{ color: '#000', fontSize: 20 }}>Reset Game</Text>
          </Pressable>
        </View>
      ) : null
      }
    </View>
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
    fontSize: 40,
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
