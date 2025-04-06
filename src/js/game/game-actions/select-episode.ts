import { EpisodeID } from "../story/episodes/episode";

/** エピソード選択完了 */
export type SelectEpisode = {
  type: "SelectEpisode";
  /** エピソードID */
  id: EpisodeID;
};
