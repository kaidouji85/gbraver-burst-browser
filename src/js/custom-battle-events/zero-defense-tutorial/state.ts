/** 0防御チュートリアルステート */
export type ZeroDefenseTutorialState = Readonly<{
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** ダメージレースストーリーを再生したか、trueで再生した */
  isDamageRaceComplete: boolean;
  /** 0バッテリーチャンスを再生したか、trueで再生した */
  isZeroBatteryChangeComplete: boolean;
  /** 0バッテリー時バーストの説明をされたか、trueでした */
  isExplainedBurstAtZeroBurst: boolean;
  /** 0バッテリー時パイロットスキルの説明をされたか、trueでした */
  isExplainedPilotSkillAtZeroBattery: boolean;
}>;
