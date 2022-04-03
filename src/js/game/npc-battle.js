// @flow
import type {ArmDozerId, GameEndResult, PilotId, Player} from "gbraver-burst-core";
import {ArmDozers, Pilots} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {SoundId} from "../resource/sound";
import {playerUuid} from "../uuid/player";

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  caption: string[],
  /** 対戦相手 */
  npc: NPC,
  /** 再生するBGMのID */
  bgm: SoundId,
};

/** NPCバトルの状態 */
export type NPCBattleState = {
  /** プレイヤー */
  player: Player,
  /**
   * NPCバトル全ステージ
   * ルート分岐はなく、stages[0] -> stages[1] ... と順番に進んでいく
   */
  stages: NPCBattleStage[],
  /**
   * 現在プレイ中のステージ
   * stagesの配列indexに相当する
   */
  stageIndex: number,
  /** ゲームクリアしたかのフラグ、trueでゲームクリア */
  isGameClear: boolean
}

/**
 * NPCバトル用のプレイヤーを生成する
 *
 * @param armdozerId プレイヤーが選択したアームドーザID
 * @param pilotId プレイヤーが選択したパイロットID
 * @return 生成したプレイヤー情報
 */
export function createNPCBattlePlayer(armdozerId: ArmDozerId, pilotId: PilotId): Player {
  const armdozer = ArmDozers.find(v => v.id === armdozerId) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === pilotId) ?? Pilots[0];
  return {playerId: playerUuid(), armdozer, pilot};
}

/**
 * 現在のステージレベルを取得する
 *
 * @param origin NPCバトルステート
 * @return ステージレベル
 */
export function getStageLevel(origin: NPCBattleState): number {
  return origin.stageIndex + 1;
}

/**
 * 現在のステージを取得する
 * ステージが取得できない場合はnullを返す
 *
 * @param origin NPCバトルステート
 * @return ステージ
 */
export function getCurrentStage(origin: NPCBattleState): ?NPCBattleStage {
  return origin.stages[origin.stageIndex] ?? null;
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
  return state.stages.length - 1 === state.stageIndex;
}

/**
 * NPCバトル開始直後のステートを生成する
 *
 * @param player プレイヤー
 * @param stages 全ステージ
 * @return NPCバトルステート
 */
export function startNPCBattle(player: Player, stages: NPCBattleStage[]): NPCBattleState {
  return {player, stages: stages, stageIndex: 0, isGameClear: false};
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

  const nextStageIndex = origin.stageIndex + 1;
  return {...origin, stageIndex: nextStageIndex};
}