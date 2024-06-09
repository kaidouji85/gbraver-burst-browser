/** 悲劇の女王用のステート */
export type QueenOfTragedyState = {
  /** イントロダクションが完了したか否か、trueで完了 */
  readonly isIntroductionComplete: boolean;
  /** 過ちを繰り返さないが完了したか否か、trueで完了 */
  readonly isNotRepeatMistakeComplete: boolean;
};
