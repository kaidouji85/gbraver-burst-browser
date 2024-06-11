import { BurstTutorialState } from "./state";

/** バッテリーチュートリアル プロパティ */
export type BurstTutorialProps = {
  /** イベントステート */
  eventState: BurstTutorialState;
};

/**
 * バーストチュートリアルのプロパティを作成する
 * @returns 生成結果
 */
export function createBurstTutorialProps() {
  const state = {
    isIntroductionComplete: false,
    isLoseIfNoDefense5Complete: false,
  };
  return { state };
}
