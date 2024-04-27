import {
  ArmdozerId,
  Armdozers,
  GameEndResult,
  PilotId,
  Pilots,
  Player,
  PlayerId,
} from "gbraver-burst-core";

import type { NPC } from "../npc/npc";
import type { SoundId } from "../resource/sound/resource";

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  caption: string[];

  /** 対戦相手 */
  npc: NPC;

  /** 再生するBGMのID */
  bgm: SoundId;
};

/** NPCバトルの状態 */
export type NPCBattleState = {
  /** プレイヤー */
  player: Player;

  /**
   * NPCバトル全ステージ
   * ルート分岐はなく、stages[0] -> stages[1] ... と順番に進んでいく
   */
  stages: NPCBattleStage[];

  /**
   * 現在プレイ中のステージ
   * stagesの配列indexに相当する
   */
  stageIndex: number;
};

/**
 * NPCバトル開始直後のステートを生成する
 *
 * @param playerId プレイヤーID
 * @param armdozerId プレイヤーが選択したアームドーザID
 * @param pilotId プレイヤーが選択したパイロットID
 * @param stages 全ステージ
 * @returns NPCバトルステート
 */
export function createNPCBattleState(
  playerId: PlayerId,
  armdozerId: ArmdozerId,
  pilotId: PilotId,
  stages: NPCBattleStage[],
): NPCBattleState {
  const armdozer = Armdozers.find((v) => v.id === armdozerId) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === pilotId) ?? Pilots[0];
  const player = {
    playerId,
    armdozer,
    pilot,
  };
  return {
    player,
    stages: stages,
    stageIndex: 0,
  };
}

/**
 * 現在のNPCステージレベルを取得する
 *
 * @param state NPCバトルステート
 * @returns ステージレベル
 */
export function getNPCStageLevel(state: NPCBattleState): number {
  return state.stageIndex + 1;
}

/**
 * 現在のNPCステージを取得する
 * ステージが取得できない場合はnullを返す
 *
 * @param origin NPCバトルステート
 * @returns ステージ
 */
export function getCurrentNPCStage(
  origin: NPCBattleState,
): NPCBattleStage | null | undefined {
  return origin.stages[origin.stageIndex] ?? null;
}

/** NPCバトル結果 */
export type NPCBattleResult = "StageClear" | "StageMiss" | "NPCBattleComplete";

/**
 * NPCバトル結果を求める
 *
 * @param isStageClear ステージクリアしたか否かのフラグ、trueでステージクリア
 * @param isLastStage ラストステージか否かのフラグ、trueでラストステージ
 * @returns 判定結果
 */
function getNPCBattleResult(
  isStageClear: boolean,
  isLastStage: boolean,
): NPCBattleResult {
  if (isStageClear && isLastStage) {
    return "NPCBattleComplete";
  } else if (isStageClear && !isLastStage) {
    return "StageClear";
  }

  return "StageMiss";
}

/** NPCバトル更新結果 */
export type UpdatedNPCBattleState = {
  /** 更新されたステート */
  state: NPCBattleState;

  /** NPCバトル結果 */
  result: NPCBattleResult;
};

/**
 * NPCバトルステートを更新する
 *
 * @param origin 更新前のステート
 * @param gameEndResult 戦闘結果
 * @returns NPCバトル更新結果
 */
export function updateNPCBattleState(
  origin: Readonly<NPCBattleState>,
  gameEndResult: Readonly<GameEndResult>,
): UpdatedNPCBattleState | null {
  const stage = getCurrentNPCStage(origin);
  if (!stage) {
    return null;
  }

  const isStageClear =
    gameEndResult.type === "GameOver" &&
    gameEndResult.winner === origin.player.playerId;
  const isLastStage = origin.stageIndex === origin.stages.length - 1;
  const result = getNPCBattleResult(isStageClear, isLastStage);
  const nextStageIndex =
    result === "StageClear" ? origin.stageIndex + 1 : origin.stageIndex;
  const updatedState = { ...origin, stageIndex: nextStageIndex };
  return {
    state: updatedState,
    result,
  };
}
