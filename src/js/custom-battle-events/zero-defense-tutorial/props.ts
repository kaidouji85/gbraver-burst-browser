import { ZeroDefenseTutorialState } from "./state";

/** ゼロ防御チュートリアル プロパティ */
export type ZeroDefenseTutorialProps = {
  /** イベントステート */
  eventState: ZeroDefenseTutorialState;
};

/**
 * ゼロ防御チュートリアル用のプロパティを生成する
 * @returns 生成結果
 */
export function createZeroDefenseTutorialProps(): ZeroDefenseTutorialProps {
  const state = {
    isIntroductionComplete: false,
    isDamageRaceComplete: false,
    isZeroBatteryChangeComplete: false,
    isExplainedBurstAtZeroBattery: false,
    isExplainedPilotSkillAtZeroBattery: false,
  };
  return { eventState: state };
}
