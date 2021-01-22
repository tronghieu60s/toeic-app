export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabPractice: undefined;
  TabDifficult: undefined;
  TabFavorite: undefined;
  TabAnalysis: undefined;
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
  TabPracticeStudyItem: undefined;
};

export type TabDifficultParamList = {
  TabDifficultScreen: undefined;
  TabPracticeWordDetails: {
    word: WordType;
  };
};

export type TabFavoriteParamList = {
  TabFavoriteScreen: undefined;
};

export type StatusQuestion = 'Waiting' | 'Correct' | 'Incorrect';
export type TypesAnswer =
  | 'CHOOSE-NAME-MEAN'
  | 'CHOOSE-MEAN-NAME'
  | 'CHOOSE-SOUND-MEAN'
  | 'CHOOSE-MEAN-SOUND'
  | 'FILL-NAME-MEAN'
  | 'FILL-MEAN-NAME';

export type StudyType = {
  id_study: number;
  count_study?: number;
  difficult_study?: number;
};

export type GroupType = {
  id_group: number;
  name_group?: string;
  pronounce_group?: string;
  explain_group?: string;
  mean_group?: string;
  image_group?: string;
};

export type WordType = GroupType &
  StudyType & {
    id_word: number;
    name_word?: string;
    pronounce_word?: string;
    explain_word?: string;
    mean_word?: string;
    id_group?: number;
  };
