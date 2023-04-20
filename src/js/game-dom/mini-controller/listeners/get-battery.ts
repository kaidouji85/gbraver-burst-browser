/**
 * バッテリーボタンのバッテリー値を取得するヘルパー関数
 * @param element 取得元
 * @return 取得結果、取得できなかった場合はnullを返す
 */
export function getBattery(element: HTMLElement): number | null {
  const battery = parseInt(element.dataset.battery ?? "");
  return Number.isInteger(battery) ? battery : null;
}
