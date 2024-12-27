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

/** 次のエピソードに進む */
export type GoingNextEpisode = {
  type: "GoingNextEpisode";
  /** 現在のエピソード */
  readonly currentEpisode: Episode;
  /** 次のエピソード */
  readonly nextEpisode: Episode;
};

/** ストーリーモードのサブフロー */
export type StorySubFLow = EpisodeSelect | PlayingEpisode | GoingNextEpisode;

/** ストーリーモード */
export type Story = {
  type: "Story";
  /** サブフロー */
  readonly story: StorySubFLow;
};
