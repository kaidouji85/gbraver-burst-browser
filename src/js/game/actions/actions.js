// @flow

/**
 * Gameが利用するアクション
 */

import type {GameEnd} from "gbraver-burst-core";

/** 遊び方ダイアログを閉じる */
export type EndHowToPlay = {
  type: 'EndHowToPlay'
};

/** 戦闘終了 */
export type EndBattle = {
  type: 'endBattle',
  /** ゲーム終了情報 */
  gameEnd: GameEnd,
}