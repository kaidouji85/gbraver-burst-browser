import { MiniControllerProps } from "./props";

/**
 * 全バッテリーボタンを取得するヘルパー関数
 * @param props コンポネントプロパティ
 * @return 取得結果
 */
export function getBatteryButtons(props: Readonly<MiniControllerProps>): HTMLElement[] {
  return [...props.batteries.querySelectorAll("button")];
}
