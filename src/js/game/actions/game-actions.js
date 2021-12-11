// @flow

import type {ArmDozerId, GameEnd, PilotId} from "gbraver-burst-core";
import type {PostNetworkError} from '../network/post-network-error';

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

/** バトル強制終了 */
export type SuddenlyBattleEnd = {
  type: 'SuddenlyBattleEnd'
};

/**
 * NPC ルート エンディング 終了
 */
export type EndNPCEnding = {
  type: 'EndNPCEnding'
};

/** ユニバーサルログインを実行する */
export type UniversalLogin = {
  type: 'UniversalLogin'
};

/** ログインダイアからのログインを中断した */
export type LoginCancel = {
  type: 'LoginCancel'
};

/** ログアウト */
export type Logout = {
  type: 'Logout'
};

/** アカウント削除同意 */
export type AccountDeleteConsent = {
  type: 'AccountDeleteConsent'
}

/** アカウント削除 */
export type DeleteAccount = {
  type: 'DeleteAccount'
};

/** アカウント削除同意ダイアログを閉じる */
export type CancelAccountDeletion = {
  type: 'CancelAccountDeletion'
};

/** WebSocketAPI エラー発生 */
export type WebSocketAPIError = {
  type: 'WebSocketAPIError',
  /** エラー情報 */
  error: any,
};

/** WebSocketAPI意図せず切断した */
export type WebSocketAPIUnintentionalClose = {
  type: 'WebSocketAPIUnintentionalClose',
  /** エラー情報 */
  error: any,
};

/** 通信エラーダイアログを閉じる */
export type EndNetworkError = {
  type: 'EndNetworkError',
  /** ダイアログを閉じた後の処理に必要な情報 */
  postNetworkError: PostNetworkError,
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
 | SuddenlyBattleEnd
 | EndNPCEnding
 | UniversalLogin
 | LoginCancel
 | Logout
 | AccountDeleteConsent
 | DeleteAccount
 | CancelAccountDeletion
 | WebSocketAPIError
 | WebSocketAPIUnintentionalClose
 | EndNetworkError;