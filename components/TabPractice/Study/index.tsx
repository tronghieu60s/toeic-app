import React, { memo } from 'react';
import AssembleWords from './StudyMode/AssembleWords';
import StudyUI from './StudyUI';

const TabPracticeStudy = memo(() => {
  return (
    <StudyUI>
      <AssembleWords />
    </StudyUI>
  );
});

export default TabPracticeStudy;
