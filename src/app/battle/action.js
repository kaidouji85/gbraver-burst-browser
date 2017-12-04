// @flow

/** 戦闘画面固有のアクション */
export type BattleAction =
 | DebugMode;

/** デバッグモードをONにする */
export type DebugMode = {
  type: 'debugMode'
};