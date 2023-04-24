import {
  BATTERY,
  BATTERY_FIRST,
  BATTERY_INVISIBLE,
  BATTERY_LAST,
} from "./class-name";

/**
 * @deprecated
 * バッテリーボタンHTMLを生成する
 * @param battery バッテリー値
 * @return 生成結果
 */
export const batteryButton = (battery: number) => `
  <button class="${BATTERY}" accesskey="${battery}" data-battery="${battery}">${battery}</button>
`;

/**
 * @deprecated
 * バッテリーボタンのバッテリー値を取得するヘルパー関数
 * @param element 取得元
 * @return 取得結果、取得できなかった場合はnullを返す
 */
export function getBattery(element: HTMLButtonElement): number | null {
  const battery = parseInt(element.dataset.battery ?? "");
  return Number.isInteger(battery) ? battery : null;
}

/**
 * @deprecated
 * バッテリーボタンを表示するヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function visibleBattery(element: HTMLButtonElement): void {
  element.className = BATTERY;
}

/**
 * @deprecated
 * バッテリーボタンを先頭要素として表示するヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function visibleBatteryAsFirst(element: HTMLButtonElement): void {
  element.className = BATTERY_FIRST;
}

/**
 * @deprecated
 * バッテリーボタンを末尾要素として表示するヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function visibleBatteryAsLast(element: HTMLButtonElement): void {
  element.className = BATTERY_LAST;
}

/**
 * @deprecated
 * バッテリーボタンを非表示にするヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function invisibleBattery(element: HTMLButtonElement): void {
  element.className = BATTERY_INVISIBLE;
}

/**
 * @deprecated
 * バッテリーボタンを操作可能にするヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function enabledBatttery(element: HTMLButtonElement): void {
  element.disabled = false;
  element.innerText = `${getBattery(element) ?? 0}`;
}

/**
 * @deprecated
 * バッテリーボタンを操作不可能にするヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function disabledBattery(element: HTMLButtonElement): void {
  element.disabled = true;
  element.innerText = "";
}
