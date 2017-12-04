// @flow
import type {BattleAction} from './battle/action';


/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction
  | BattleAction;

/** リサイズ */
export type ResizeAction = {
  type: 'resize'
};

/** ゲームループ */
export type GameLoopAction = {
  type: 'gameLoop'
};