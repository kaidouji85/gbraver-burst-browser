import { DataIDs } from "./data-ids";

/**
 * エピソード一覧を抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodes(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="episodes"]`) ?? document.createElement("div")
  );
}

/**
 * イメージカット集合のルート要素を抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodeImageCutContainer(
  root: HTMLElement,
): HTMLElement {
  return (
    root.querySelector(`[data-id="episodeImageCutContainer"]`) ??
    document.createElement("div")
  );
}

/**
 * メインエピソードタブを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractMainEpisodeTab(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="mainEpisodeTab"]`) ??
    document.createElement("div")
  );
}

/**
 * サイドエピソードタブを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractSideEpisodeTab(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="sideEpisodeTab"]`) ??
    document.createElement("div")
  );
}

/**
 * エピソードタイトルを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodeTitle(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="episodeTitle"]`) ??
    document.createElement("div")
  );
}

/**
 * エピソード導入を抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodeIntroduction(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="episodeIntroduction"]`) ??
    document.createElement("div")
  );
}

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractPlayButton(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="playButton"]`) ??
    document.createElement("div")
  );
}

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractPrevButton(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="prevButton"]`) ??
    document.createElement("div")
  );
}

/** @deprecated ルート要素の子孫要素 */
type ExtractElement = {
  /** エピソード一覧 */
  episodes: HTMLElement;
  /** イメージカット集合のルート要素 */
  episodeImageCutContainer: HTMLElement;
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
 * @deprecated
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(
  root: HTMLElement,
  ids: DataIDs,
): ExtractElement {
  const episodes: HTMLElement =
    root.querySelector(`[data-id="${ids.episodes}"]`) ??
    document.createElement("div");
  const episodeImageCutContainer: HTMLElement =
    root.querySelector(`[data-id="${ids.episodeImageCutContainer}"]`) ??
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
    episodeImageCutContainer,
    mainEpisodeTab,
    sideEpisodeTab,
    episodeTitle,
    episodeIntroduction,
    playButton,
    prevButton,
  };
}
