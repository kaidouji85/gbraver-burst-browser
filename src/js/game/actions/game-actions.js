// @flow

import type {ArmDozerId, GameEnd, PilotId} from "gbraver-burst-core";

/** ゲームスタート */
export type GameStart = {
  type: 'GameStart'
};

/** カジュアルマッチスタート */
export type CasualMatchStart = {
  type: 'CasualMatchStart'
};

/** 遊び方動画を表示 */
export type ShowHowToPlay = {
  type: 'ShowHowToPlay'
};

/** 遊び方ダイアログを閉じる */
export type EndHowToPlay = {
  type: 'EndHowToPlay'
};

/**
 * プレイヤー選択完了
 */
export type SelectionComplete = {
  type: 'SelectionComplete',
  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId,
  /** 選択したパイロットのID */
  pilotId: PilotId,
};

/**
 * プレイヤー選択キャンセル
 */
export type SelectionCancel = {
  type: 'SelectionCancel'
};

/** 戦闘終了 */
export type EndBattle = {
  type: 'EndBattle',
  /** ゲーム終了情報 */
  gameEnd: GameEnd,
}

/**
 * NPC ルート エンディング 終了
 */
export type EndNPCEnding = {
  type: 'EndNPCEnding'
};

/** ログインダイアからのログインを中断した */
export type LoginCancel = {
  type: 'LoginCancel'
};

/** ログインダイログからのログインが成功した */
export type LoginSuccess = {
  type: 'LoginSuccess'
};

/** 通信エラーが発生した */
export type NetworkError = {
  type: 'NetworkError'
};

/** 通信エラーダイアログを閉じる */
export type EndNetworkError = {
  type: 'EndNetworkError'
};

/**
 * ゲーム全体で利用するアクション
 */
export type GameAction = GameStart
 | CasualMatchStart
 | ShowHowToPlay
 | EndHowToPlay
 | SelectionComplete
 | SelectionCancel
 | EndBattle
 | EndNPCEnding
 | LoginCancel
 | LoginSuccess
 | NetworkError
 | EndNetworkError;