import { PilotSkillTutorial02State } from "./state";

/** パイロットスキルチュートリアル（後半） プロパティ */
export type PilotSkillTutorial02Props = {
  /** ステート */
  state: PilotSkillTutorial02State;
};

/**
 * パイロットスキルチュートリアル（後半）用のプロパティを生成する
 * @return 生成結果
 */
export function createPilotSkillTutorial02Props(): PilotSkillTutorial02Props {
  const state = {
    isIntroductionComplete: false,
    isDoPilotSkillComplete: false,
    isShouldAttack3OrMoreComplete: false,
  };
  return { state };
}
