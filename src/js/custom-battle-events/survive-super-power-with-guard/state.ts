/** 「超火力はガードで凌げ」用のステート */
export type SurviveSuperPowerWithGuardState = {
  /** イントロダクションが完了したか否か、trueで完了 */
  readonly isIntroductionComplete: boolean;
  /** 「5攻撃すれば勝利」が完了したか否か、trueで完了 */
  readonly isAttack5AndWeWinComplete: boolean;
};
