import {
  EpisodeID,
  EpisodeType,
} from "../../../game/tutorial-stages/episode";

/** エピソード情報 */
export type Episode = {
  /** チュートリアルステージID */
  id: EpisodeID;
  /** チュートリアルタイプ */
  type: EpisodeType;
  /** チュートリアルステージタイトル */
  title: string;
};
