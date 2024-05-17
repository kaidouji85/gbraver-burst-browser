import {
  extractEnemyBatteryCorrect,
  extractEnemyBatteryMinus,
  extractEnemyBatteryPlus,
  extractEnemyBatteryValue,
  extractEnemyBattleResultName,
  extractEnemyDamage,
  extractPlayerBatteryCorrect,
  extractPlayerBatteryMinus,
  extractPlayerBatteryPlus,
  extractPlayerBatteryValue,
  extractPlayerBattleResultName,
  extractPlayerDamage,
} from "./extract-element";

/** プレイヤーに関するHTML要素 */
export type PlayerElements = {
  /** 戦闘結果名 */
  battleResultName: HTMLElement;
  /** ダメージ */
  damage: HTMLElement;
  /** バッテリー値 */
  batteryValue: HTMLElement;
  /** バッテリー補正 */
  batteryCorrect: HTMLElement;
  /** バッテリープラスボタン */
  batteryPlus: HTMLElement;
  /** バッテリーマイナスボタン */
  batteryMinus: HTMLElement;
};

/**
 * プレイヤーのHTML要素を生成する
 * @param root ルート要素
 * @returns 生成結果
 */
export const createPlayerElements = (root: HTMLElement) => ({
  battleResultName: extractPlayerBattleResultName(root),
  damage: extractPlayerDamage(root),
  batteryValue: extractPlayerBatteryValue(root),
  batteryCorrect: extractPlayerBatteryCorrect(root),
  batteryPlus: extractPlayerBatteryPlus(root),
  batteryMinus: extractPlayerBatteryMinus(root),
});

/**
 * 敵のHTML要素を生成する
 * @param root ルート要素
 * @returns 生成結果
 */
export const createEnemyElements = (root: HTMLElement) => ({
  battleResultName: extractEnemyBattleResultName(root),
  damage: extractEnemyDamage(root),
  batteryValue: extractEnemyBatteryValue(root),
  batteryCorrect: extractEnemyBatteryCorrect(root),
  batteryPlus: extractEnemyBatteryPlus(root),
  batteryMinus: extractEnemyBatteryMinus(root),
});
