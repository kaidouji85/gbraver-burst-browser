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

/** 次のエピソードへ向かう */
export type GoingToNextEpisode = {
  type: "GoingToNextEpisode";
  /** 次のエピソード */
  readonly nextEpisode: Episode;
};

/** ストーリーモードのサブフロー */
export type StorySubFLow = EpisodeSelect | PlayingEpisode | GoingToNextEpisode;

/** ストーリーモード */
export type Story = {
  type: "Story";
  /** サブフロー */
  readonly story: StorySubFLow;
};
