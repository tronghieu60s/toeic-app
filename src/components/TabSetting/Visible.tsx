import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExplain, toggleMean, togglePronounce } from '~/src/redux/actions/commonAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import SwitchCustom from '../UI/SwitchCustom';

const TabSettingVisible = React.memo(() => {
  const dispatch = useDispatch();
  const common = useSelector((state: RootState) => state.common);
  const { visibleMean, visibleExplain, visiblePronounce } = common;

  return (
    <>
      <SwitchCustom
        name="Hiển Thị Nghĩa"
        description="Hiển thị nghĩa của từ vựng."
        value={visibleMean}
        onValueChange={() => dispatch(toggleMean())}
      />
      <SwitchCustom
        name="Hiển Thị Phiên Âm"
        description="Hiển thị phiên âm của từ vựng."
        value={visiblePronounce}
        onValueChange={() => dispatch(togglePronounce())}
      />
      <SwitchCustom
        name="Hiển Thị Giải Thích"
        description="Hiển thị giải thích của từ vựng."
        value={visibleExplain}
        onValueChange={() => dispatch(toggleExplain())}
      />
    </>
  );
});

export default TabSettingVisible;
