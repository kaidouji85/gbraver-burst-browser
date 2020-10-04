// @flow

import type {GameEnd} from "gbraver-burst-core";

/** 戦闘終了 */
export type EndBattle = {
  type: 'endBattle',
  /** ゲーム終了情報 */
  gameEnd: GameEnd,
}