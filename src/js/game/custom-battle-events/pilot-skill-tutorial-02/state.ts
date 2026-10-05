/** パイロットスキルチュートリアル（後半）ステート */
export type PilotSkillTutorial02State = {
  /** 「イントロダクション」を再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** 「パイロットスキル発動を推奨」を再生したか、trueで再生した */
  isDoPilotSkillComplete: boolean;
  /** 「3以上で攻撃する」を再生したか、trueで再生した */
  isShouldAttack3OrMoreComplete: boolean;
};
