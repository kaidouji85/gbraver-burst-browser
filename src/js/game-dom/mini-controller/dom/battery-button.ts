import { BATTERY, BATTERY_FIRST, BATTERY_INVISIBLE, BATTERY_LAST } from "./class-name";

/**
 * バッテリーボタンHTMLを生成する
 * @param battery バッテリー値
 * @return 生成結果
 */
export const batteryButton = (battery: number) => `
  <button class="${BATTERY}" accesskey="${battery}" data-battery="${battery}">${battery}</button>
`;

/**
 * バッテリーボタンのバッテリー値を取得するヘルパー関数
 * @param element 取得元
 * @return 取得結果、取得できなかった場合はnullを返す
 */
export function getBattery(element: HTMLElement): number | null {
  const battery = parseInt(element.dataset.battery ?? "");
  return Number.isInteger(battery) ? battery : null;
}

/**
 * バッテリーボタンを表示するヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function visibleBattery(element: HTMLElement): void {
  element.className = BATTERY;
}

/**
 * バッテリーボタンを先頭要素として表示するヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function visibleBatteryAsFirst(element: HTMLElement): void {
  element.className = BATTERY_FIRST;
}

/**
 * バッテリーボタンを末尾要素として表示するヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function visibleBatteryAsLast(element: HTMLElement): void {
  element.className = BATTERY_LAST;
}

/**
 * バッテリーボタンを非表示にするヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function invisibleBattery(element: HTMLElement): void {
  element.className = BATTERY_INVISIBLE;
}
