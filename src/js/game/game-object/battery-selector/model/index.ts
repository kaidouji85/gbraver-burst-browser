import type { ButtonLabel } from "./button-label";

/** バッテリー最小値 */
export const MIN_BATTERY = 0;

/** バッテリーセレクタモデル */
export type BatterySelectorModel = {
  /** 最後に選択したバッテリーの値 */
  battery: number;
  /** バッテリー最大値 */
  maxBattery: number;
  /** 選択可能なバッテリーの最大値 */
  enableMaxBattery: number;
  /** メーター針の値、0〜1のパーセント */
  needle: number;
  /** バッテリーボタンラベル */
  label: ButtonLabel;
  /** 不透明度 1〜0で指定して1で完全不透明 */
  opacity: number;
  /**
   * 押下通知を止めるか否か、trueで通知を止める
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * バッテリーセレクタが反応しないようにする
   */
  shouldPushNotifierStop: boolean;
  /** -ボタン 拡大率 */
  minusButtonScale: number;
  /** +ボタン 拡大率 */
  plusButtonScale: number;
  /** バッテリーボタン 拡大率 */
  batteryButtonScale: number;
};
