/** スタンドアローン */
export type StandAlone = {
  type: "stand-alone";
};

/**
 * スタンドアローン用のネットワークコンテキストを作成する
 * @returns スタンドアローン用のネットワークコンテキスト
 */
export function createStandAloneContext(): StandAlone {
  return {
    type: "stand-alone",
  };
}
