import { PilotSkillTutorial01State } from "./state";

/** パイロットスキルチュートリアル（前半） プロパティ */
export type PilotSkillTutorial01Props = {
  /** ステート */
  state: PilotSkillTutorial01State;
};

/**
 * パイロットスキルチュートリアル（前半）用のプロパティを生成する
 * @returns 生成結果
 */
export function createPilotSkillTutorial01Props(): PilotSkillTutorial01Props {
  const state = {
    isIntroductionComplete: false,
    isGaiInspectingComplete: false,
  };
  return { state };
}
