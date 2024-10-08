/**
 * ロボ、パイロット選択タイプセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerSelectorTypeSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="playerSelectorTypeSelector"]`) ??
  document.createElement("select");

/**
 * アニメーションタイムスケールセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractBattleAnimationTimeScaleSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="battleAnimationTimeScaleSelector"]`) ??
  document.createElement("select");

/**
 * 戦闘ウインドウのフォントサイズセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractBattleWindowFontSizeSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="battleWindowFontSizeSelector"]`) ??
  document.createElement("select");

/**
 * 戦闘画面ピクセルレートセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractWebGLPixelRatioSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="webGLPixelRatioSelector"]`) ??
  document.createElement("div");

/**
 * バトルコントローラータイプセレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractBattleControllerTypeSelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="battleControllerTypeSelector"]`) ??
  document.createElement("div");

/**
 * BGM音量セレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
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
 * @returns 抽出結果
 */
export const extractBgmVolumeValue = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="bgmVolumeValue"]`) ??
  document.createElement("div");

/**
 * SE音量セレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
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
 * @returns 抽出結果
 */
export const extractSeVolumeValue = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="seVolumeValue"]`) ??
  document.createElement("div");

/**
 * パフォーマンス統計セレクタを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPerformanceStatsVisibilitySelector = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="performanceStatsVisibilitySelector"]`) ??
  document.createElement("div");

/**
 * 「戻る」ボタンを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPrev = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="prev"]`) ?? document.createElement("button");

/**
 * 「この設定にする」ボタンを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractConfigChange = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="configChange"]`) ??
  document.createElement("button");
