import { PilotSkillTutorial02State } from "./state";

/** パイロットスキルチュートリアル（後半） プロパティ */
export type PilotSkillTutorial02Props = {
  /** イベントステート */
  eventState: PilotSkillTutorial02State;
};

/**
 * パイロットスキルチュートリアル（後半）用のプロパティを生成する
 * @returns 生成結果
 */
export function createPilotSkillTutorial02Props(): PilotSkillTutorial02Props {
  const eventState = {
    isIntroductionComplete: false,
    isDoPilotSkillComplete: false,
    isShouldAttack3OrMoreComplete: false,
  };
  return { eventState };
}
