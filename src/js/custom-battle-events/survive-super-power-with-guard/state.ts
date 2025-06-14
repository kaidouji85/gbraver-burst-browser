/** 「超火力はガードで凌げ」用のステート */
export type SurviveSuperPowerWithGuardState = {
  /** イントロダクションが完了したか否か、trueで完了 */
  readonly isIntroductionComplete: boolean;
  /** 3ターン目開始時のイベントが完了したか否か、trueで完了 */
  readonly isThirdTurnEventComplete: boolean;
};
