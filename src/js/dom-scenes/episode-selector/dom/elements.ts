import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  /** エピソード一覧 */
  episodes: HTMLElement;
  /** エピソードのイメージカット */
  episodeImageCut: HTMLImageElement;
  /** エピソードタイトル */
  episodeTitle: HTMLElement;
  /** エピソード導入 */
  episodeIntroduction: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const episodes: HTMLElement =
    root.querySelector(`[data-id="${ids.episodes}"]`) ??
    document.createElement("div");
  const foundEpisodeImageCut = root.querySelector(
    `[data-id="${ids.episodeImageCut}"]`,
  );
  const episodeImageCut: HTMLImageElement =
    foundEpisodeImageCut instanceof HTMLImageElement
      ? foundEpisodeImageCut
      : document.createElement("img");
  const episodeTitle: HTMLElement =
    root.querySelector(`[data-id="${ids.episodeTitle}"]`) ??
    document.createElement("div");
  const episodeIntroduction: HTMLElement =
    root.querySelector(`[data-id="${ids.episodeIntroduction}"]`) ??
    document.createElement("div");
  const prevButton: HTMLElement =
    root.querySelector(`[data-id="${ids.prevButton}"]`) ??
    document.createElement("div");
  return {
    episodes,
    episodeImageCut,
    episodeTitle,
    episodeIntroduction,
    prevButton,
  };
}
