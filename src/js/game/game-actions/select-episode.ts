import { EpisodeID } from "../story-mode/episode";

/** エピソード選択完了 */
export type SelectEpisode = {
  type: "SelectEpisode";
  /** エピソードID */
  id: EpisodeID;
};
