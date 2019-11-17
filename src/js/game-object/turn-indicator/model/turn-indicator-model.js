// @flow

/** ターンインジケーターモデル */
export type TurnIndicatorModel = {
  /**
   * プレイヤーターンであるか否かのフラグ、trueでプライヤーターンである
   */
  isPlayerTurn: boolean,

  /** 0 - 1 で表現する透明度 */
  opacity: number,

  /** 0 - 1 で表現するアニメーション進捗 */
  animation: number,
};