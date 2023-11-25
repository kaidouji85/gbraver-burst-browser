/** 「対決、二人のブレイバー！！」のステート */
export type ConfrontationTwoBraverState = Readonly<{
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** 3ターン目開始時のストーリーが再生されたか、 */
  isTurn3StartPlayed: boolean;
}>;
