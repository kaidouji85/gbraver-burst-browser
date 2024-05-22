import { PlayerElements } from "./player-elements";

/**
 * バッテリー補正を隠す
 * @param batteryCorrect
 */
const hiddenBatteryCorrect = (batteryCorrect: HTMLElement) => {
  batteryCorrect.innerText = "";
};

/**
 * プラスのバッテリー補正にする
 * @param batteryCorrect バッテリー補正HTML要素
 * @param value バッテリー補正
 */
const positiveBatteryCorrect = (batteryCorrect: HTMLElement, value: number) => {
  batteryCorrect.innerText = `+${value}`;
};

/**
 * マイナスのバッテリー補正にする
 * @param batteryCorrect バッテリー補正HTML要素
 * @param value バッテリー補正
 */
const negativeBatteryCorrect = (batteryCorrect: HTMLElement, value: number) => {
  batteryCorrect.innerText = `-${value}`;
};

/**
 * バッテリー補正を更新する
 * @param elements 更新対象のプレイヤー関連HTML要素
 * @param value バッテリー補正
 */
export const updateBatteryCorrect = (
  elements: PlayerElements,
  value: number,
) => {
  const { batteryCorrect } = elements;
  if (0 < value) {
    positiveBatteryCorrect(batteryCorrect, value);
  } else if (value < 0) {
    negativeBatteryCorrect(batteryCorrect, value);
  } else {
    hiddenBatteryCorrect(batteryCorrect);
  }
};
