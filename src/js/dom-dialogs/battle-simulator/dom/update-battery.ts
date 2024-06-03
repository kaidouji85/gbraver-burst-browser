import { PlayerElements } from "./player-elements";

/**
 * プレイヤーが出したバッテリーを更新する
 * @param elements プレイヤーHTML要素
 * @param battery 更新するバッテリー値
 */
export function updateBattery(elements: PlayerElements, battery: number) {
  const { batteryValue } = elements;
  batteryValue.innerText = `${battery}`;
}
