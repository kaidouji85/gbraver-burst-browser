/**
 * エピソード一覧を抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractEpisodes = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="episodes"]`) ?? document.createElement("div");

/**
 * イメージカット集合のルート要素を抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractEpisodeImageCutContainer = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="episodeImageCutContainer"]`) ??
  document.createElement("div");

/**
 * メインエピソードタブを抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractMainEpisodeTab = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="mainEpisodeTab"]`) ??
  document.createElement("div");

/**
 * サイドエピソードタブを抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractSideEpisodeTab = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="sideEpisodeTab"]`) ??
  document.createElement("div");

/**
 * エピソードタイトルを抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractEpisodeTitle = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="episodeTitle"]`) ??
  document.createElement("div");

/**
 * エピソード導入を抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractEpisodeIntroduction = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="episodeIntroduction"]`) ??
  document.createElement("div");

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractPlayButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="playButton"]`) ?? document.createElement("div");

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractPrevButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="prevButton"]`) ?? document.createElement("div");
