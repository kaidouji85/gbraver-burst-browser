import { Episode } from "./episode";

/**
 * チュートリアル最終ステージかを判定する
 * @param currentEpisode 現在のエピソード
 * @param episodes エピソード一覧
 * @returns 判定結果、trueであればチュートリアル最終ステージ
 */
export const isLastTutorial = (currentEpisode: Episode, episodes: Episode[]) =>
  episodes.filter((e) => e.isTutorial).at(-1)?.id === currentEpisode.id;
