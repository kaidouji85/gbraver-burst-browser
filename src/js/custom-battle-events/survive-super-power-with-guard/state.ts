/** 「超火力はガードで凌げ」用のステート */
export type SurviveSuperPowerWithGuardState = {
  /** イントロダクションが完了したか否か、trueで完了 */
  readonly isIntroductionComplete: boolean;
  /** 2ターン目開始時のイベントが完了したか否か、trueで完了 */
  readonly isSecondTurnEventComplete: boolean;
  /** バトルシミュレーターを使うが完了したか否か、trueで完了 */
  readonly isUseBattleSimulatorComplete: boolean;
};
