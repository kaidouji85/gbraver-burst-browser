import { EpisodeID } from "../../../game/episodes/episode";

/** チュートリアルステージ選択情報 */
export type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: EpisodeID;
  /** ステージレベル */
  level: number;
};
