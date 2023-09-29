import {
  EpisodeID,
  EpisodeType,
} from "../../../game/episodes/episode";

/** エピソード情報 */
export type Episode = {
  /** チュートリアルステージID */
  id: EpisodeID;
  /** チュートリアルタイプ */
  type: EpisodeType;
  /** チュートリアルステージタイトル */
  title: string;
};
