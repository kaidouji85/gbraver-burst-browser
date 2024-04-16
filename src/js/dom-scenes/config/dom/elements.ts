import type { DataIDs } from "./data-ids";

/**
 * アニメーションタイムスケールセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractBattleAnimationTimeScaleSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="battleAnimationTimeScaleSelector"]`) ??
  document.createElement("select");

/**
 * 戦闘画面ピクセルレートセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractWebGLPixelRatioSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="webGLPixelRatioSelector"]`) ??
  document.createElement("div");

/**
 * バトルコントローラータイプセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractBattleControllerTypeSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="battleControllerTypeSelector"]`) ??
  document.createElement("div");

/**
 * BGM音量セレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractBgmVolumeSelector = (
  root: HTMLElement,
): HTMLInputElement => {
  const extractedBGMVolumeSelector = root.querySelector(
    `[data-id="bgmVolumeSelector"]`,
  );
  return extractedBGMVolumeSelector instanceof HTMLInputElement
    ? extractedBGMVolumeSelector
    : document.createElement("input");
};

/**
 * BGM音量値を抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractBgmVolumeValue = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="bgmVolumeValue"]`) ??
  document.createElement("div");

/**
 * SE音量セレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractSeVolumeSelector = (
  root: HTMLElement,
): HTMLInputElement => {
  const extractedSeVolumeSelector = root.querySelector(
    `[data-id="seVolumeSelector"]`,
  );
  return extractedSeVolumeSelector instanceof HTMLInputElement
    ? extractedSeVolumeSelector
    : document.createElement("input");
};

/**
 * SE音量値を抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractSeVolumeValue = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="seVolumeValue"]`) ??
  document.createElement("div");

/**
 * パフォーマンス統計セレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractPerformanceStatsVisibilitySelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="performanceStatsVisibilitySelector"]`) ??
  document.createElement("div");

/**
 * 「戻る」ボタンを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractPrev = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="prev"]`) ?? document.createElement("button");

/**
 * 「この設定にする」ボタンを抽出する
 * @param root 抽出対象となるルート要素
 * @return 抽出結果
 */
export const extractConfigChange = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="configChange"]`) ?? document.createElement("button");

/** ルート要素の子孫要素 */
type Elements = {
  battleAnimationTimeScaleSelector: HTMLElement;
  webGLPixelRatioSelector: HTMLElement;
  battleControllerTypeSelector: HTMLElement;
  bgmVolumeSelector: HTMLInputElement;
  bgmVolumeValue: HTMLElement;
  seVolumeSelector: HTMLInputElement;
  seVolumeValue: HTMLElement;
  performanceStatsVisibilitySelector: HTMLElement;
  prev: HTMLElement;
  configChange: HTMLElement;
};

/**
 * @deprecated
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const battleAnimationTimeScaleSelector: HTMLElement =
    root.querySelector(`[data-id="${ids.battleAnimationTimeScaleSelector}"]`) ??
    document.createElement("select");
  const webGLPixelRatioSelector: HTMLElement =
    root.querySelector(`[data-id="${ids.webGLPixelRatioSelector}"]`) ??
    document.createElement("div");
  const battleControllerTypeSelector: HTMLElement =
    root.querySelector(`[data-id="${ids.battleControllerTypeSelector}"]`) ??
    document.createElement("div");
  const extractedBGMVolumeSelector = root.querySelector(
    `[data-id="${ids.bgmVolumeSelector}"]`,
  );
  const bgmVolumeSelector =
    extractedBGMVolumeSelector instanceof HTMLInputElement
      ? extractedBGMVolumeSelector
      : document.createElement("input");
  const bgmVolumeValue: HTMLElement =
    root.querySelector(`[data-id="${ids.bgmVolumeValue}"]`) ??
    document.createElement("div");
  const extractedSeVolumeSelector = root.querySelector(
    `[data-id="${ids.seVolumeSelector}"]`,
  );
  const seVolumeSelector =
    extractedSeVolumeSelector instanceof HTMLInputElement
      ? extractedSeVolumeSelector
      : document.createElement("input");
  const seVolumeValue: HTMLElement =
    root.querySelector(`[data-id="${ids.seVolumeValue}"]`) ??
    document.createElement("div");
  const performanceStatsVisibilitySelector: HTMLElement =
    root.querySelector(
      `[data-id="${ids.performanceStatsVisibilitySelector}"]`,
    ) ?? document.createElement("div");
  const prev: HTMLElement =
    root.querySelector(`[data-id="${ids.prev}"]`) ??
    document.createElement("button");
  const configChange: HTMLElement =
    root.querySelector(`[data-id="${ids.configChange}"]`) ??
    document.createElement("button");
  return {
    battleAnimationTimeScaleSelector,
    webGLPixelRatioSelector,
    battleControllerTypeSelector,
    prev,
    configChange,
    bgmVolumeSelector,
    bgmVolumeValue,
    seVolumeSelector,
    seVolumeValue,
    performanceStatsVisibilitySelector,
  };
}
