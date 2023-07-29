import { ROOT_CLASS as MESSAGE_WINDOW_ROOT } from "../../../game-dom/message-window/dom/class-name";
import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import template from "./defense-battery-caption-inner-html.hbs";

/**
 * 防御バッテリー注釈の innerHTML を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成した innerHTML
 */
export function defenseBatteryCaptionInnerHtml(resources: Resources): string {
  const minusBatteryPath =
    resources.paths.find((v) => v.id === PathIds.MESSAGE_WINDOW_MINUS_BATTERY)
      ?.path ?? "";
  const plusBatteryPath =
    resources.paths.find((v) => v.id === PathIds.MESSAGE_WINDOW_PLUS_BATTERY)
      ?.path ?? "";
  const defenseBatteryPath =
    resources.paths.find((v) => v.id === PathIds.MESSAGE_WINDOW_DEFENSE_BATTERY)
      ?.path ?? "";
  return template({
    MESSAGE_WINDOW_ROOT,
    minusBatteryPath,
    plusBatteryPath,
    defenseBatteryPath,
  });
}
