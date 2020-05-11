// @flow

import type {Player} from "gbraver-burst-core";
import type {InProgress} from "./in-progress";

/** Gameが持つ状態 */
export type State = {
  /** 現在進行中のフロー */
  inProgress: InProgress,
};

/**
 * 初期ステータスを生成する
 *
 * @return {{level: number, player: Player}}
 */
export function createInitialState(): State {
  return {
    inProgress: {type: 'None'}
  };
}