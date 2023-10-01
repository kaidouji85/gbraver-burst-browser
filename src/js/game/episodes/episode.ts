import type { Player } from "gbraver-burst-core";

import type { NPC } from "../../npc/npc";
import { Resources } from "../../resource";
import type { SoundId } from "../../resource/sound";
import type { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";

/** エピソードID */
export type EpisodeID = string;

/** エピソードタイプ */
export type EpisodeType =
  /** @deprecated 初級 */
  | "Beginner"
  /** @deprecated 中級 */
  | "Intermediate"
  /** @deprecated 上級 */
  | "Advanced"
  /** エピソード */
  | "Episode"
  /** サイドエピソード */
  | "Side episode";

/** エピソード番号 */
export type EpisodeNumber = number;

/** エピソード設定 */
export type EpisodeConfig = {
  /** エピソードID */
  id: EpisodeID;
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

/** エピソード */
export type Episode = EpisodeConfig & {
  /** エピソードタイプ */
  type: EpisodeType;
  /** エピソード番号 */
  number: EpisodeNumber;
};
