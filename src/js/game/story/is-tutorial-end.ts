import { Episode } from "./episode";
import { EpisodeIDs } from "./episodes/episode-ids";

/**
 * チュートリアル最終ステージかを判定する
 * @param currentEpisode 現在のエピソード
 * @returns 判定結果、trueであればチュートリアル最終ステージ
 */
export const isTutorialEnd = (currentEpisode: Episode) =>
  currentEpisode.id === EpisodeIDs.TWO_BRAVER;
