import { Episode } from "../episodes/episode";

/** エピソード選択 */
export type EpisodeSelect = {
  type: "EpisodeSelect";
};

/** エピソードをプレイ中 */
export type PlayingEpisode = {
  type: "PlayingEpisode";
  /** プレイ中のエピソード */
  readonly episode: Episode;
};

/** ストーリーモードのサブフロー */
type StorySubFLow = EpisodeSelect | PlayingEpisode;

/** ストーリーモード */
export type Story = {
  type: "Story";
  /** サブフロー */
  readonly story: StorySubFLow;
};
