import { BurstTutorialState } from "./state";

/** バッテリーチュートリアル プロパティ */
export type BurstTutorialProps = {
  /** ステート */
  state: BurstTutorialState;
};

/**
 * バーストチュートリアルのプロパティを作成する
 * @return 生成結果
 */
export function createBurstTutorialProps() {
  const state = {
    isIntroductionComplete: false,
    isLoseIfNoDefense5Complete: false,
  };
  return { state };
}
