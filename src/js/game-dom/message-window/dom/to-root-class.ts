import { WindowType } from "../window-type";
import {
  ROOT_CLASS,
  ROOT_CLASS_ENEMY_SHOUT,
  ROOT_CLASS_INVISIBLE,
  ROOT_CLASS_LEFT,
  ROOT_CLASS_NEAR_BATTERY_SELECTOR,
  ROOT_CLASS_NEAR_BURST_BUTTON,
  ROOT_CLASS_NEAR_PILOT_BUTTON,
  ROOT_CLASS_PLAYER_SHOUT,
  ROOT_CLASS_RIGHT,
} from "./class-name";

/**
 * メッセージウインドウタイプに対応したroot要素class属性を取得する
 * @param type メッセージウインドウタイプ
 * @return root要素のclass属性
 */
export function toRootClass(type: WindowType): string {
  switch (type) {
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
    case "PlayerShout":
      return ROOT_CLASS_PLAYER_SHOUT;
    case "EnemyShout":
      return ROOT_CLASS_ENEMY_SHOUT;
    default:
      return ROOT_CLASS_INVISIBLE;
  }
}
