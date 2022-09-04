// @flow
import type {GameEndResult, Player} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {SoundId} from "../resource/sound";
import type {CustomBattleEvent} from './td-scenes/battle/custom-battle-event';

/** チュートリアルステージ */
export type TutorialStage = {
  /** チュートリアルタイトル */
  title: string,
  /** カスタムバトルイベント生成関数、カスタムバトルイベントは状態を持つので都度生成する */
  event: () => CustomBattleEvent,
  /** NPC */
  npc: NPC,
  /** プレイヤー */
  player: Player,
  /** 再生するBGMのID */
  bgm: SoundId
};

/** チュートリのステート */
export type TutorialState = {
  /** 
   * チュートリアルステージ
   * ルート分岐はなく、stages[0] -> stages[1] ... と順番に進んでいく
   */
  stages: TutorialStage[],
  /** 現在プレイ中のステージ、stages配列のindexである */
  stageIndex: number,
};

/**
 * 現在プレイ中のステージを取得するヘルパー関数
 * 
 * @param state チュートリアルのステート 
 * @return 取得結果、データ不整合でステージが見つからない場合はnullを返す
 */
export function getCurrentTutorialStage(state: TutorialState): ?TutorialStage {
  return state.stages[state.stageIndex] ?? null;
}

/**
 * チュートリアルステートを生成する
 * 
 * @param stages チュートリアルステージ
 * @return チュートリアルステート
 */
export function createTutorialState(stages: TutorialStage[]): TutorialState {
  return {stages, stageIndex: 0};
}

/** チュートリアルステージリザルト */
export type TutorialResult = 'StageClear' | 'StageMiss' | 'TutorialComplete';

/**
 * チュートリアルステージリザルトを求める
 * 
 * @param isStageClear ステージをクリアしたか否かのフラグ、trueでクリアした 
 * @param isLastStage 最終ステージか否かのフラグ、falseで最終ステージ
 * @return ステージリザルト
 */
function getTutorialResult(isStageClear: boolean, isLastStage: boolean): TutorialResult {
  if (isStageClear && isLastStage) {
    return 'TutorialComplete';
  } else if (isStageClear && !isLastStage) {
    return 'StageClear';
  }
  return 'StageMiss';
}

/** チュートリアルステート更新結果 */
export type UpdatedTutorialState = {
  /** 更新後のステート */
  state: TutorialState,
  /** ステージリザルト */
  result: TutorialResult,
};

/**
 * チュートリアルステートを更新する
 * 
 * @param origin 更新前のステート
 * @param result 戦闘結果
 * @return チュートリアルステート更新結果、ステート不整合で更新できない場合はnullを返す
 */
export function updateTutorialState(origin: TutorialState, result: GameEndResult): ?UpdatedTutorialState {
  const currentStage = getCurrentTutorialStage(origin);
  if (!currentStage) {
    return null;
  }

  const isStageClear =  result.type === 'GameOver' && result.winner === currentStage.player.playerId;
  const isLastStage = origin.stageIndex === origin.stages.length - 1;
  const tutorialResult = getTutorialResult(isStageClear, isLastStage);
  const updatedStageIndex = tutorialResult === 'StageClear' ? origin.stageIndex + 1 : origin.stageIndex;
  const updatedState = {...origin, stageIndex: updatedStageIndex};
  return {state: updatedState, result: tutorialResult};
}