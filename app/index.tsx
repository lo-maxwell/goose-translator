import { View, StyleSheet, TextInput, Text, Dimensions, ImageSourcePropType, ScrollView } from 'react-native';
import Button from '@/components/Button';
import React, { useState } from 'react';
import IconButton from './IconButton';
import About from './About';
import AudioPlayerButton from './AudioPlayerButton';


const { height } = Dimensions.get('window');
const boxHeight = height * 0.2;

export default function Index() {
  const [inputText, setInputText] = React.useState('');
  const [inputtedText, setInputtedText] = useState('');
  const [translationText, setTranslationText] = useState('Translation');
  const [gooseName, setGooseName] = useState<string>('Fred');
  const [imgSource, setImgSource] = useState<ImageSourcePropType>(require('@/assets/images/gooseSelectionImages/goose-1.jpg'));
  
  function convertWordToHonk(word: string): string {
    if (word.length === 0) return '';

    function isPunctuation(char: string) {
      return /[.,\/#!$%\^&\*;:{}=\-_`~()'"]/.test(char);
    }

    function wordLenMinusPunctuation(word: string) {
      let wordLen = 0;
      for (const char of word) {
        if (!isPunctuation(char)) {
          wordLen++;
        }
      }
      return wordLen;
    }

    let result = '';

    if (wordLenMinusPunctuation(word) === 0) return word;

    let modifiedWord = word;

    if (wordLenMinusPunctuation(word) === 1) {
      let stringBuilder1 = '';
      for (const char of modifiedWord) {
        if (!isPunctuation(char)) {
          stringBuilder1 = stringBuilder1 + ((char == char.toLowerCase()) ? 'honk' : 'HONK');
        } else {
          stringBuilder1 = stringBuilder1 + char;
        }
      }
      modifiedWord = stringBuilder1;
    }

    else if (wordLenMinusPunctuation(word) === 2) {
      let charsFound = 0;
      let stringBuilder2 = '';
      for (const char of modifiedWord) {
        if (!isPunctuation(char)) {
          if (charsFound === 0) {
            stringBuilder2 = stringBuilder2 + ((char == char.toLowerCase()) ? 'ho' : 'HO');
            charsFound++;
          } else {
            stringBuilder2 = stringBuilder2 + ((char == char.toLowerCase()) ? 'nk' : 'NK');
            charsFound++;
          }
        } else {
          stringBuilder2 = stringBuilder2 + char;
        }
      }
      modifiedWord = stringBuilder2;
    }

    else if (wordLenMinusPunctuation(word) === 3) {
      let charsFound = 0;
      let stringBuilder3 = '';
      for (const char of modifiedWord) {
        if (!isPunctuation(char)) {
          if (charsFound === 0) {
            stringBuilder3 = stringBuilder3 + ((char == char.toLowerCase()) ? 'h' : 'H');
            charsFound++;
          } else if (charsFound === 1) {
            stringBuilder3 = stringBuilder3 + ((char == char.toLowerCase()) ? 'o' : 'O');
            charsFound++;
          } else if (charsFound === 2) {
            stringBuilder3 = stringBuilder3 + ((char == char.toLowerCase()) ? 'nk' : 'NK');
            charsFound++;
          }
        } else {
          stringBuilder3 = stringBuilder3 + char;
        }
      }
      modifiedWord = stringBuilder3;
    }

    let hSet = false;
    for (const char of modifiedWord) {
      if (isPunctuation(char)) {
        result = result + char;
      } else {
        if (!hSet) {
          result = result + ((char == char.toLowerCase()) ? 'h' : 'H');
          hSet = true;
        } else {
          result = result + ((char == char.toLowerCase()) ? 'o' : 'O');
        }
      }
    }

    let kSet = false;
    let nSet = false;
    for (let i = 0; i < result.length; i++) {
      const indexToCheck = result.length - 1 - i;
      const toCheck = result.charAt(indexToCheck);
      if (!isPunctuation(toCheck)) {
        if (!kSet) {
          result = result.slice(0, indexToCheck) + ((toCheck == toCheck.toLowerCase()) ? 'k' : 'K') + result.slice(indexToCheck+1);
          kSet = true;
        } else if (!nSet) {
          result = result.slice(0, indexToCheck) + ((toCheck == toCheck.toLowerCase()) ? 'n' : 'N') + result.slice(indexToCheck+1);
          nSet = true;
        } else {
          break;
        }
      }
    }

    return result;
  }

  function translateText() {
    const textArray = inputText.trim().split(/\s+/);
    if (textArray.length === 0 || (textArray.length === 1 && textArray[0] === '')) {
      setTranslationText("Translation");
      setInputtedText("");
      return;
    }
    const honkArray = textArray.map((elem, index) => {
      return convertWordToHonk(elem);  
    })
    setTranslationText(honkArray.join(" "));
    setInputtedText(inputText);
  }

  return (
    <>
    <View style={styles.container}>
    <About/>
      <View style={styles.imageContainer}>
        <IconButton imgSource={imgSource} setImgSource={setImgSource} setGooseName={setGooseName}/>
        <Text style={styles.gooseName}>{gooseName}</Text>
      </View>
      <View style={styles.inputContainer}>
        <ScrollView style={styles.scrollView}>
          <TextInput
            style={[styles.input]}
            onChangeText={setInputText}
            value={inputText}
            multiline
            placeholder={inputText.length === 0 ? "Insert Text Here" : ""}
          />
        </ScrollView>
      </View>
      
      <View style={styles.textInputContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.translationText]} selectable>{translationText}</Text>
        </ScrollView>
        <AudioPlayerButton inputtedText={inputtedText} gooseName={gooseName}/>
      </View>   
      <View style={styles.footerContainer}>
        <Button 
          label="Translate" 
          onClickHandler={translateText} 
          style={{
            paddingVertical: 25,
            paddingHorizontal: 50,
            backgroundColor: "orange",
            minHeight: 75,
            maxHeight: '100%', // Limit the height to the parent's height
            height: 'auto', // Allow the height to adjust based on content
            alignSelf: 'center', // Center the button horizontally
          }} 
          labelStyle={{ 
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 20,
    width: '80%',
    height: boxHeight,
    position: 'relative'
  },
  input: {
    fontSize: 28,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#AEC6CF',
    alignItems: 'center',
    paddingTop: 40,
  },
  gooseName: {
    fontSize: 36, // Increased font size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Centered text
    marginTop: 10, // Space above the text
  },
  imageContainer: {
    
  },
  textInputContainer: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 20,
    width: '80%',
    height: boxHeight, 
    verticalAlign: 'top',
    position: 'relative'
  },
  scrollView: {
    flex: 1,
    padding: 10,
    paddingBottom: 10,
  },
  translationText: {
    fontSize: 28,
    paddingBottom: 10,
  },
   image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    alignItems: 'center',
  },
});
