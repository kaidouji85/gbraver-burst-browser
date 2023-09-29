import type { Player } from "gbraver-burst-core";

import type { NPC } from "../../npc/npc";
import { Resources } from "../../resource";
import type { SoundId } from "../../resource/sound";
import type { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";

/** エピソードID */
export type EpisodeID = string;

/** @deprecated エピソードタイプ */
export type EpisodeType =
  /** 初級 */
  | "Beginner"
  /** 中級 */
  | "Intermediate"
  /** 上級 */
  | "Advanced";

/** エピソード */
export type Episode = {
  /** エピソードID */
  id: EpisodeID;
  /** エピソードタイプ */
  type: EpisodeType;
  /** タイトル */
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
