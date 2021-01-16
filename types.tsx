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
    group: GroupType[string];
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
  [key: string]: {
    key?: string;
    name: string;
    mean: string;
    pronounce: string;
    image: string;
  };
};

export type WordType = {
  name: string;
  pronounce: string;
  explain: string;
  mean: string;
  group: string;
};
