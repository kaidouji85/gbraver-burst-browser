import { Subject } from "rxjs";

import { BATTERY } from "../dom/class-name";

/** バッテリーボタン押下通知情報 */
export type BatteryPush = {
  /** 選択したバッテリーの値 */
  battery: number;
  /** バッテリーボタン押下時のDOMイベント */
  event: Event;
};

/** バッテリーボタンプロパティ */
export type BatteryButtonProps = {
  /** ルート要素 */
  root: HTMLButtonElement;
  /** バッテリー値 */
  battery: number;
  /** バッテリー押下ストリーム */
  batteryPush: Subject<BatteryPush>;
};

/**
 * バッテリープロパティを生成する
 * @param battery バッテリー値
 * @returns 生成結果
 */
export function createBatteryButtonProps(battery: number): BatteryButtonProps {
  const root = document.createElement("button");
  root.className = BATTERY;
  root.accessKey = `${battery}`;
  const batteryPush = new Subject<BatteryPush>();
  return { root, battery, batteryPush };
}
