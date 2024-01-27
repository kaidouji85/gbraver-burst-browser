import type { DataIDs } from "./data-ids";

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
