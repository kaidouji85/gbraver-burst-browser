import { PilotSkillTutorial01State } from "./state";

/** パイロットスキルチュートリアル（前半） プロパティ */
export type PilotSkillTutorial01Props = {
  /** イベントステート */
  eventState: PilotSkillTutorial01State;
};

/**
 * パイロットスキルチュートリアル（前半）用のプロパティを生成する
 * @returns 生成結果
 */
export function createPilotSkillTutorial01Props(): PilotSkillTutorial01Props {
  const eventState = {
    isIntroductionComplete: false,
    isGaiInspectingComplete: false,
  };
  return { eventState };
}
