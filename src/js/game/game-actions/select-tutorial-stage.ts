import { EpisodeID } from "../tutorial-stages/episode";

/** チュートリアルステージ選択完了 */
export type SelectTutorialStage = {
  type: "SelectTutorialStage";
  /** ステージID */
  id: EpisodeID;
  /** ステージレベル */
  level: number;
};
