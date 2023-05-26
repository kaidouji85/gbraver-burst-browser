import type { Player } from "gbraver-burst-core";

import type { NPC } from "../../npc/npc";
import type { SoundId } from "../../resource/sound";
import type { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";

/** チュートリアルステージID */
export type TutorialStageID = string;

/** チュートリアルステージ */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID;
  /** チュートリアルタイトル */
  title: string[];
  /** カスタムバトルイベント生成関数、カスタムバトルイベントは状態を持つので都度生成する */
  event: () => CustomBattleEvent;
  /** NPC */
  npc: NPC;
  /** プレイヤー */
  player: Player;
  /** 再生するBGMのID */
  bgm: SoundId;
};
