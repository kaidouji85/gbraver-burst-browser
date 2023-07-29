import type { Player } from "gbraver-burst-core";

import type { NPC } from "../../npc/npc";
import { Resources } from "../../resource";
import type { SoundId } from "../../resource/sound";
import type { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";

/** チュートリアルステージID */
export type TutorialStageID = string;

/** チュートリアルタイプ */
export type TutorialType =
  /** 初級 */
  | "Beginner"
  /** 中級 */
  | "Intermediate"
  /** 上級 */
  | "Advanced";

/** チュートリアルステージ */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID;
  /** チュートリアルタイプ */
  type: TutorialType;
  /** チュートリアルタイトル */
  title: string[];
  /** NPC */
  npc: NPC;
  /** プレイヤー */
  player: Player;
  /** 再生するBGMのID */
  bgm: SoundId;
  /**
   * カスタムバトルイベント生成関数、カスタムバトルイベントは状態を持つので都度生成する
   * @param resources リソース管理オブジェクト
   * @returns カスタムバトルイベント
   */
  event: (resources: Resources) => CustomBattleEvent;
};
