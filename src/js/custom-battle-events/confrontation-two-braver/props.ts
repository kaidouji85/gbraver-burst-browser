import { ConfrontationTwoBraverState } from "./state";

/** 「対決、二人のブレイバー！！」のカスタムプロパティ */
export type ConfrontationTwoBraverProps = {
  /** ステート */
  state: ConfrontationTwoBraverState;
};

/**
 * 「対決、二人のブレイバー！！」のカスタムプロパティを作成する
 * @return 生成結果
 */
export function createConfrontationTwoBraverProps() {
  const state = {
    isIntroductionComplete: false,
  };
  return { state };
}
