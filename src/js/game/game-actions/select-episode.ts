import { EpisodeID } from "../episodes/episode";

/** エピソード選択完了 */
export type SelectEpisode = {
  type: "SelectEpisode";
  /** エピソードID */
  id: EpisodeID;
  /** レベル */
  level: number;
};
