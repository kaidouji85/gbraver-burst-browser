import {Position} from "../position";
import {
  ROOT_CLASS,
  ROOT_CLASS_INVISIBLE,
  ROOT_CLASS_LEFT,
  ROOT_CLASS_NEAR_BATTERY_SELECTOR,
  ROOT_CLASS_NEAR_BURST_BUTTON,
  ROOT_CLASS_NEAR_PILOT_BUTTON,
  ROOT_CLASS_RIGHT
} from "./class-name";

/**
 * メッセージウインドウ位置に対応したroot要素class属性を取得する
 *
 * @param position メッセージウインドウ位置
 * @return root要素のclass属性
 */
export function toRootClass(position: Position): string {
  switch (position) {
    case "Center":
      return ROOT_CLASS;

    case "Left":
      return ROOT_CLASS_LEFT;

    case "Right":
      return ROOT_CLASS_RIGHT;

    case "NearBatterySelector":
      return ROOT_CLASS_NEAR_BATTERY_SELECTOR;

    case "NearBurstButton":
      return ROOT_CLASS_NEAR_BURST_BUTTON;

    case "NearPilotButton":
      return ROOT_CLASS_NEAR_PILOT_BUTTON;

    default:
      return ROOT_CLASS_INVISIBLE;
  }
}