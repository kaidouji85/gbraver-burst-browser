// @flow

import type {InProgress} from "./in-progress";

/** Gameが持つ状態 */
export type State = {
  /** 現在進行中のフロー */
  inProgress: InProgress,
};

/**
 * 初期ステートを生成する
 *
 * @return 初期ステート
 */
export function createInitialState(): State {
  return {
    inProgress: {type: 'None'}
  };
}