/** パイロットスキルチュートリアル01 ステート */
export type PilotSkillTutorial01State = Readonly<{
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** ガイ視察を再生したか、trueで再生した */
  isGaiInspectingComplete: boolean;
}>;
