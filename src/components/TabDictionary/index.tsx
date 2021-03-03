import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getWordsByNameOrMean } from '~/src/models/WordsModel';
import tailwind from '~/tailwind';
import { TabDictionaryParamList, WordType } from '~/types';
import WordItem from '../TabPractice/Words/WordItem';
import { ScrollView, Text, View } from '../Themed';
import ScreenLoading from '../UI/ScreenLoading';

type Props = {
  navigation: StackNavigationProp<TabDictionaryParamList, 'TabDictionaryScreen'>;
};

export default memo(function TabDictionary({ navigation }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [words, setWords] = useState<WordType[]>([]);

  const onPress = async () => {
    setIsPending(true);
    const words = await getWordsByNameOrMean(textSearch, 20);
    if (textSearch.length > 0) setWords(words.data);
    else setWords([]);
    setIsPending(false);
  };

  const handleDetailsWord = (word: WordType) => {
    navigation.navigate('TabPracticeWordDetails', { word });
  };

  const renderItems = () => {
    return words.map((word, index) => (
      <WordItem
        key={index}
        word={word}
        handleDetailsWord={handleDetailsWord}
      />
    ));
  };

  return (
    <ScrollView light>
      <View style={tailwind('flex-row justify-center items-center py-4 mb-2')}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTextSearch(text)}
          value={textSearch}
          placeholder="Nhập từ vựng cần tìm..."
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={tailwind('text-white')}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      {isPending ? (
        <View style={tailwind('mt-5 bg-transparent')}>
          <ScreenLoading transparent />
        </View>
      ) : (
        <View style={tailwind('mx-2 bg-transparent pb-14')}>{renderItems()}</View>
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  input: {
    ...tailwind('w-8/12 h-10 border px-4'),
    borderColor: '#dee2e6',
    borderRadius: 5,
  },
  button: {
    ...tailwind('items-center ml-2'),
    backgroundColor: '#5e72e4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
});
