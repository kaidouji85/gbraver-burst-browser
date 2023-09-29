import {
  EpisodeID,
  EpisodeType,
} from "../../../game/episodes/episode";

/** エピソード情報 */
export type Episode = {
  /** エピソードID */
  id: EpisodeID;
  /** エピソードタイプ */
  type: EpisodeType;
  /** タイトル */
  title: string;
};
