export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabPractice: undefined;
  TabFavorite: undefined;
  TabAnalysis: undefined;
  TabDownload: undefined;
  TabSetting: undefined;
};

export type TabPracticeParamList = {
  TabPracticeScreen: undefined;
  TabPracticeWords: {
    group: GroupType;
  };
  TabPracticeWordDetails: {
    word: WordType;
  };
  TabPracticeStudy: undefined;
};

export type TabFavoriteParamList = {
  TabFavoriteScreen: undefined;
};

export type StatusQuestion = 'Waiting' | 'Correct' | 'Incorrect';

export type GroupType = {
  id_group: number;
  name_group: string;
  pronounce_group: string;
  explain_group: string;
  mean_group: string;
  image_group: string;
};

export type WordType = {
  id_word: number;
  name_word: string;
  pronounce_word: string;
  explain_word: string;
  mean_word: string;
  group: GroupType;
};
