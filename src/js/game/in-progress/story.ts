import type { Episode } from "../episodes/episode";

/** ストーリーモード */
export type Story = {
  type: "Story";
  /** サブフロー */
  story: StorySubFLow;
};

/** ストーリーモードのサブフロー */
type StorySubFLow = EpisodeSelect | PlayingEpisode;

/** エピソード選択 */
export type EpisodeSelect = {
  type: "EpisodeSelect";
};

/** エピソードをプレイ中 */
export type PlayingEpisode = {
  type: "PlayingEpisode";
  /** プレイ中のエピソード */
  episode: Episode;
  /** @deprecated プレイ中のレベル */
  level: number;
};
