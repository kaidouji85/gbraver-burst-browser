import { PlayerId, PlayerState } from "gbraver-burst-core"

/** 戦闘シミュレーター通知情報 */
export type BattleSimulateNotify = {
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId;
  /** ゲームに参加しているプレイヤーのステート */
  playerState: PlayerState[];
}