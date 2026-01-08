import { StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { Circle, G, Line, Text as SvgText } from "react-native-svg";

type Props = {
  numFrets: number;
  highlightedNotes: { string: number; fret: number; notShow?: boolean }[];
}

// Notes on all 6 strings up to the 12th fret
const notesOnFrets = [
  ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],
  ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
  ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],
  ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"],
  ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],
  ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
];

// Limitations:
  // Strings: 0 to 5
  // Frets: 0 to 12

// Pass in a number of frets to display (1-12) and an array of notes to highlight
// Notes are passed in 0-indexed by string and fret number
export default function FretboardDiagram({ numFrets=12,
  highlightedNotes = [] }: Props) {
  if (!numFrets || numFrets < 1 || numFrets > 12) {
    return null;
  }
  const { width } = useWindowDimensions();
  const height = width * 0.5; // keep an aspect ratio

  const stringSpacing = 50;
  const fretSpacing = 900 / numFrets;

  const fretLines = Array.from({length: numFrets + 1}, (_, fret) => (
    <Line 
      key={fret}
      x1={(fretSpacing * fret) + 50}
      y1={50 - 4}
      x2={(fretSpacing * fret) + 50}
      y2={300 + 4}
      stroke="silver"
      strokeWidth="4"
    />
  ));

  const stringNotes = highlightedNotes.map((note, index) => {
    // limitations check
    if (note.fret < 0 || note.fret > numFrets) {
      return null;
    }
    // has to be a viable string
    if (note.string < 0 || note.string > 5) {
      return null;
    }

    // if the note is on the 0th fret, highlight the letter already there
    if (note.fret == 0) {
      return (
        <G key={index}>
          <Circle cx={25} cy={(note.string+1)*stringSpacing} r="21.5" fill="greenyellow" />
          {/* <SvgText stroke="black" fontSize="30" x={25} y={((note.string+1)*stringSpacing)+10} textAnchor="middle">{notesOnFrets[note.string][note.fret % 12]}</SvgText> */}
        </G>
      )
    } else {
      return (
        <G key={index}>
          <Circle cx={((note.fret * fretSpacing)) - (fretSpacing/2) + 50} cy={(note.string+1)*stringSpacing} r="21.5" fill="greenyellow" />
          {!note.notShow && <SvgText stroke="black" fontSize="30" x={(note.fret*fretSpacing) - (fretSpacing/2)+50} y={((note.string+1)*stringSpacing)+10} textAnchor="middle">{notesOnFrets[note.string][note.fret % 12]}</SvgText>}
        </G>
      )

    }
  });

  const fretNumbers = Array.from({length: numFrets+1}, (_, fret) => {
    if (fret === 0) {
      return(
        <SvgText 
          key={fret}
          stroke="black"
          fontSize="30"
          x={25}
          y={25}
          textAnchor="middle"
        >
          {fret}
        </SvgText>
      );
    } else {
      return(
      <SvgText 
        key={fret}
        stroke="black"
        fontSize="30"
        x={((fret) * fretSpacing) - (fretSpacing/2) + 50}
        y={25}
        textAnchor="middle"
      >
        {fret}
      </SvgText>
      );
    }
  });

  return (
    <View style={{ width: "100%", alignItems: 'center', position:'absolute',  }}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 1000 350"
        preserveAspectRatio="xMidYMid meet"
        style={{ alignSelf: 'center' }}
      >
        <Line x1="50" y1={1 * stringSpacing} x2="950" y2={1 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={2 * stringSpacing} x2="950" y2={2 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={3 * stringSpacing} x2="950" y2={3 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={4 * stringSpacing} x2="950" y2={4 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={5 * stringSpacing} x2="950" y2={5 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={6 * stringSpacing} x2="950" y2={6 * stringSpacing} stroke="white" strokeWidth="8" />

        {fretNumbers}
        {fretLines}

        {stringNotes}

        <SvgText stroke="black" fontSize="30" x="25" y={(1*stringSpacing)+10} textAnchor="middle">E</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(3*stringSpacing)+10} textAnchor="middle">D</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(4*stringSpacing)+10} textAnchor="middle">G</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(5*stringSpacing)+10} textAnchor="middle">B</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(2*stringSpacing)+10} textAnchor="middle">A</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(6*stringSpacing)+10} textAnchor="middle">E</SvgText>
      </Svg>
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
    color: '#ffffffff',
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
