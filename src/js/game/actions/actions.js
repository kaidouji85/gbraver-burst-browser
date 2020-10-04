// @flow

import type {ArmDozerId, GameEnd} from "gbraver-burst-core";

/**
 * Gameが利用するアクション
 */

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

/**
 * NPC ルート エンディング 終了
 */
export type EndNPCEnding = {
  type: 'EndNPCEnding'
};

/**
 * 選択完了
 */
export type SelectionComplete = {
  type: 'SelectionComplete',

  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId
};

