import {
  EpisodeID,
  EpisodeNumber,
  EpisodeType,
} from "../../game/episodes/episode";

/** エピソード情報 */
export type Episode = {
  /** エピソードID */
  id: EpisodeID;
  /** エピソード番号 */
  number: EpisodeNumber;
  /** エピソードタイプ */
  type: EpisodeType;
  /** タイトル */
  title: string;
  /** 導入 */
  introduction: string;
  /** イメージカットのパスID */
  imageCutPathId: string;
};
