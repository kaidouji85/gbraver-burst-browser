import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  /** エピソード一覧 */
  episodes: HTMLElement;
  /** エピソードのイメージカット */
  episodeImageCut: HTMLElement;
  /** メインエピソードタブ */
  mainEpisodeTab: HTMLElement;
  /** サイドエピソードタブ */
  sideEpisodeTab: HTMLElement;
  /** エピソードタイトル */
  episodeTitle: HTMLElement;
  /** エピソード導入 */
  episodeIntroduction: HTMLElement;
  /** このエピソードで遊ぶボタン */
  playButton: HTMLElement;
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
  const episodeImageCut: HTMLElement =
    root.querySelector(`[data-id="${ids.episodeImageCut}"]`) ??
    document.createElement("div");
  const mainEpisodeTab: HTMLElement =
    root.querySelector(`[data-id="${ids.mainEpisodeTab}"]`) ??
    document.createElement("div");
  const sideEpisodeTab: HTMLElement =
    root.querySelector(`[data-id="${ids.sideEpisodeTab}"]`) ??
    document.createElement("div");
  const episodeTitle: HTMLElement =
    root.querySelector(`[data-id="${ids.episodeTitle}"]`) ??
    document.createElement("div");
  const episodeIntroduction: HTMLElement =
    root.querySelector(`[data-id="${ids.episodeIntroduction}"]`) ??
    document.createElement("div");
  const playButton: HTMLElement =
    root.querySelector(`[data-id="${ids.playButton}"]`) ??
    document.createElement("div");
  const prevButton: HTMLElement =
    root.querySelector(`[data-id="${ids.prevButton}"]`) ??
    document.createElement("div");
  return {
    episodes,
    episodeImageCut,
    mainEpisodeTab,
    sideEpisodeTab,
    episodeTitle,
    episodeIntroduction,
    playButton,
    prevButton,
  };
}
