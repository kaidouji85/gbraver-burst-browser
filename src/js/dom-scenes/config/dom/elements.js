// @flow
import type { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  battleAnimationTimeScaleSelector: HTMLSelectElement,
  webGLPixelRatioSelector: HTMLSelectElement,
  bgmVolumeSelector: HTMLInputElement,
  bgmVolumeValue: HTMLElement,
  seVolumeSelector: HTMLInputElement,
  seVolumeValue: HTMLElement,
  prev: HTMLElement,
  configChange: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const extractedBattleAnimationTimeScaleSelector = root.querySelector(
    `[data-id="${ids.battleAnimationTimeScaleSelector}"]`
  );
  const battleAnimationTimeScaleSelector =
    extractedBattleAnimationTimeScaleSelector instanceof HTMLSelectElement
      ? extractedBattleAnimationTimeScaleSelector
      : document.createElement("select");
  const extractedWebGlPixelRatioSelector = root.querySelector(
    `[data-id="${ids.webGLPixelRatioSelector}"]`
  );
  const webGLPixelRatioSelector =
    extractedWebGlPixelRatioSelector instanceof HTMLSelectElement
      ? extractedWebGlPixelRatioSelector
      : document.createElement("select");
  const extractedBGMVolumeSelector = root.querySelector(
    `[data-id="${ids.bgmVolumeSelector}"]`
  );
  const bgmVolumeSelector =
    extractedBGMVolumeSelector instanceof HTMLInputElement
      ? extractedBGMVolumeSelector
      : document.createElement("input");
  const bgmVolumeValue =
    root.querySelector(`[data-id="${ids.bgmVolumeValue}"]`) ??
    document.createElement("div");
  const extractedSeVolumeSelector = root.querySelector(
    `[data-id="${ids.seVolumeSelector}"]`
  );
  const seVolumeSelector =
    extractedSeVolumeSelector instanceof HTMLInputElement
      ? extractedSeVolumeSelector
      : document.createElement("input");
  const seVolumeValue =
    root.querySelector(`[data-id="${ids.seVolumeValue}"]`) ??
    document.createElement("div");
  const prev =
    root.querySelector(`[data-id="${ids.prev}"]`) ??
    document.createElement("button");
  const configChange =
    root.querySelector(`[data-id="${ids.configChange}"]`) ??
    document.createElement("button");
  return {
    battleAnimationTimeScaleSelector,
    webGLPixelRatioSelector,
    prev,
    configChange,
    bgmVolumeSelector,
    bgmVolumeValue,
    seVolumeSelector,
    seVolumeValue,
  };
}
