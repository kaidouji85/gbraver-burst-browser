/** バーストチュートリアルのステート */
export type BurstTutorialState = {
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** 5防御しないと負けを再生したか、trueで再生した */
  isLoseIfNoDefense5Complete: boolean;
};
