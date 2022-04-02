// @flow
import type {GameEndResult, Player} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {SoundId} from "../resource/sound";
import {SOUND_IDS} from "../resource/sound";
import {normalNeoLandozer} from "../npc/normal-neo-landozer";

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  caption: string[],
  /** 対戦相手 */
  npc: NPC,
  /** 再生するBGMのID */
  bgm: SoundId,
};

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: normalNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** NPCバトルの状態 */
export type NPCBattleState = {
  /** プレイヤー */
  player: Player,
  /** コース */
  course: NPCBattleStage[],
  /**
   * 現在プレイ中のステージ
   * courseの配列indexに相当する
   */
  stageIndex: number,
  /** ゲームクリアしたかのフラグ、trueでゲームクリア */
  isGameClear: boolean
}

/**
 * ステージインデックスをステージNoに変換する
 *
 * @param stageIndex 変換元
 * @return 変換結果
 */
export function toStageNumber(stageIndex: number): number {
  return stageIndex + 1;
}

/**
 * ステージクリアしたか否かを判定する
 *
 * @param player プレイヤー情報
 * @param gameEndResult ゲームエンド結果
 * @return 判定結果、trueでステージクリアである
 */
export function isStageClear(player: Player, gameEndResult: GameEndResult): boolean {
  return gameEndResult.type === 'GameOver' && gameEndResult.winner === player.playerId;
}

/**
 * ラストステージであるか否かを判定する
 *
 * @param state NPCバトルステート
 * @return 判定結果、trueでラストステージ
 */
export function isLastStage(state: NPCBattleState): boolean {
  return state.course.length === state.stageIndex;
}

/**
 * NPCバトル開始直後のステートを生成する
 *
 * @param player プレイヤー
 * @param course コース
 * @return NPCバトルステート
 */
export function startNPCBattle(player: Player, course: NPCBattleStage[]): NPCBattleState {
  return {player, course, stageIndex: 0, isGameClear: false};
}

/**
 * 戦闘結果に応じてNPCバトルステートを更新する
 *
 * @param origin 更新前のステート
 * @param gameEndResult 戦闘結果
 * @return NPCバトルステート更新結果
 */
export function updateNPCBattle(origin: NPCBattleState, gameEndResult: GameEndResult): NPCBattleState {
  if (!isStageClear(origin.player, gameEndResult)) {
    return origin;
  }

  if (isLastStage(origin)) {
    return {...origin, isGameClear: true};
  }

  const nextStageIndex = origin.stageIndex ++;
  return {...origin, stageIndex: nextStageIndex};
}