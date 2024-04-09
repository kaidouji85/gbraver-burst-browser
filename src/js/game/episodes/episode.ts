import { Player } from "gbraver-burst-core";

import { NPC } from "../../npc/npc";
import { Resources } from "../../resource";
import { PathId } from "../../resource/path/resource";
import { SoundId } from "../../resource/sound/resource";
import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";

/** エピソードID */
export type EpisodeID = string;

/** エピソードタイプ */
export type EpisodeType =
  /** エピソード */
  | "Episode"
  /** サイドエピソド */
  | "Side Episode";

/**
 * エピソード番号
 * サイドエピソードに1.10などの番号をつけたいが、number型では実現できないのでstring型にしている
 * 番号の末尾に.(ドット)をつけてばならない
 *   OK 3.1
 *   NG 3.1.
 */
export type EpisodeNumber = string;

/** エピソード */
export type Episode = {
  /** エピソードID */
  id: EpisodeID;
  /** エピソードタイプ */
  type: EpisodeType;
  /** エピソード番号 */
  number: EpisodeNumber;
  /** タイトル */
  title: string;
  /** エピソード導入の文章 */
  introduction: string;
  /** イメージカットのパスID */
  imageCutPathId: PathId;
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
