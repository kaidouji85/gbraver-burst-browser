import { EpisodeID } from "../story/episode";

/** エピソード選択完了 */
export type SelectEpisode = {
  type: "SelectEpisode";
  /** エピソードID */
  id: EpisodeID;
};
