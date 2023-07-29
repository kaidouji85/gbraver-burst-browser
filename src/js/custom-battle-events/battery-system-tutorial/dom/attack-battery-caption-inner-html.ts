import { ROOT_CLASS as MESSAGE_WINDOW_ROOT } from "../../../game-dom/message-window/dom/class-name";
import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import template from "./attack-battery-caption-inner-html.hbs";

/**
 * 攻撃バッテリー注釈の innerHTML を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成した innerHTML
 */
export function attackBatteryCaptionInnerHtml(resources: Resources): string {
  const minusBatteryPath =
    resources.paths.find((v) => v.id === PathIds.MESSAGE_WINDOW_MINUS_BATTERY)
      ?.path ?? "";
  const plusBatteryPath =
    resources.paths.find((v) => v.id === PathIds.MESSAGE_WINDOW_PLUS_BATTERY)
      ?.path ?? "";
  const attackBatteryPath =
    resources.paths.find((v) => v.id === PathIds.MESSAGE_WINDOW_ATTACK_BATTERY)
      ?.path ?? "";
  return template({
    MESSAGE_WINDOW_ROOT,
    minusBatteryPath,
    plusBatteryPath,
    attackBatteryPath,
  });
}
