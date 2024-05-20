/**
 * 閉じるアイコンを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLImageElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("img");

/**
 * 背景を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractBackGround = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="back-ground"]`) ??
  document.createElement("div");

/**
 * プレイヤーの戦闘結果名を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerBattleResultName = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="player-battle-result-name"]`) ??
  document.createElement("div");

/**
 * プレイヤーのダメージを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerDamage = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="player-damage"]`) ??
  document.createElement("div");

/**
 * プレイヤーのバッテリー値を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerBatteryValue = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="player-battery-value"]`) ??
  document.createElement("div");

/**
 * プレイヤーのバッテリー補正を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerBatteryCorrect = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="player-battery-correct"]`) ??
  document.createElement("div");

/**
 * プレイヤーのバッテリープラスを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerBatteryPlus = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="player-battery-plus"]`) ??
  document.createElement("div");

/**
 * プレイヤーのバッテリーマイナスを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractPlayerBatteryMinus = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="player-battery-minus"]`) ??
  document.createElement("div");

/**
 * 敵の戦闘結果名を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractEnemyBattleResultName = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enemy-battle-result-name"]`) ??
  document.createElement("div");

/**
 * 敵のダメージを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractEnemyDamage = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enemy-damage"]`) ??
  document.createElement("div");

/**
 * 敵のバッテリー値を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractEnemyBatteryValue = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enemy-battery-value"]`) ??
  document.createElement("div");

/**
 * 敵のバッテリー補正を抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractEnemyBatteryCorrect = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enemy-battery-correct"]`) ??
  document.createElement("div");

/**
 * 敵のバッテリープラスを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractEnemyBatteryPlus = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enemy-battery-plus"]`) ??
  document.createElement("div");

/**
 * 敵のバッテリーマイナスを抽出する
 * @param root 抽出対象となるルート要素
 * @returns 抽出結果
 */
export const extractEnemyBatteryMinus = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enemy-battery-minus"]`) ??
  document.createElement("div");
