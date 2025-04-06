import { Episode } from "../story/episodes/episode";

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

/**
 * 次のエピソードに進む準備
 * ステージクリアなど次エピソードにすすむことが確定した時に、本ステートに遷移する
 */
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
  /** チュートリアルか否か、trueならチュートリアル */
  readonly isTutorial: boolean;
  /** サブフロー */
  readonly story: StorySubFLow;
};
