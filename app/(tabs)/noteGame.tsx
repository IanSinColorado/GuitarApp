import { Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
 import { Link } from 'expo-router'; 
import Svg, { Line, Circle, Text as SvgText, G } from "react-native-svg";

export default function Index() {
  const { width } = useWindowDimensions();
  const height = width * 0.5; // keep an aspect ratio

  const stringSpacing = 50;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Note Game</Text>
      <Link href="/" style={styles.button}>
        Home
      </Link>
      <Svg
        width="100%"
        height={height}
        viewBox="0 0 1000 350"
        preserveAspectRatio="xMidYMid meet"
      >
        <Line x1="50" y1={1 * stringSpacing} x2="950" y2={1 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={2 * stringSpacing} x2="950" y2={2 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={3 * stringSpacing} x2="950" y2={3 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={4 * stringSpacing} x2="950" y2={4 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={5 * stringSpacing} x2="950" y2={5 * stringSpacing} stroke="white" strokeWidth="8" />
        <Line x1="50" y1={6 * stringSpacing} x2="950" y2={6 * stringSpacing} stroke="white" strokeWidth="8" />

        <SvgText stroke="black" fontSize="30" x="25" y={(1*stringSpacing)+10} textAnchor="middle">E</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(3*stringSpacing)+10} textAnchor="middle">D</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(4*stringSpacing)+10} textAnchor="middle">G</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(5*stringSpacing)+10} textAnchor="middle">B</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(2*stringSpacing)+10} textAnchor="middle">A</SvgText>
        <SvgText stroke="black" fontSize="30" x="25" y={(6*stringSpacing)+10} textAnchor="middle">E</SvgText>
      </Svg>
      <View style={{width: '90%', height: 100, marginTop:20}}>
        <Pressable
            style={[styles.button2, { backgroundColor: '#fff' }]}
            onPress={() => alert('You pressed a button.')}>
            <Svg
            width="100%"
            height={height}
            viewBox="0 0 1000 350"
            preserveAspectRatio="xMidYMid meet"
            >
                <Circle cx={50} cy={100} r="21.5" fill="greenyellow" />

            </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
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
});
