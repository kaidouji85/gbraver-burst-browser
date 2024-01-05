/** バッテリーシステムチュートリアル ステート */
export type BatterySystemTutorialState = Readonly<{
  /** バッテリーシステムの解説が完了しているか、trueで完了している */
  isBatterySystemDescriptionComplete: boolean;
  /** 0バッテリー時バーストの説明をされたか、trueでした */
  isExplainedBurstAtZeroBurst: boolean;
  /** 0バッテリー時パイロットスキルの説明をされたか、trueでした */
  isExplainedPilotSkillAtZeroBattery: boolean;
}>;
