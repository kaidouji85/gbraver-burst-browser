import { Subject } from "rxjs";

import { BATTERY } from "../dom/class-name";

/** バッテリーボタンプロパティ */
export type BatteryButtonProps = {
  /** ルート要素 */
  root: HTMLButtonElement;
  /** バッテリー値 */
  battery: number;
  /** バッテリー押下ストリーム */
  batteryPush: Subject<number>;
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
  const batteryPush = new Subject<number>();
  return { root, battery, batteryPush };
}
