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
};

export type TabFavoriteParamList = {
  TabFavoriteScreen: undefined;
};

export type GroupType = {
  [key: string]: {
    name: string;
    pronounce: string;
    image: string;
  };
};
