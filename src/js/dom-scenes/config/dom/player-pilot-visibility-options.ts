import {
  PlayerPilotVisibilities,
  PlayerPilotVisibility,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";
import template from "./player-pilot-visibility-option.hbs";

/**
 * プレイヤーパイロット表示設定のラジオボタン要素HTMLを生成する
 * @param selected 初期に選択されているプレイヤーパイロット表示設定
 * @returns 生成結果
 */
export const playerPilotVisibilityOptions = (selected: PlayerPilotVisibility) =>
  PlayerPilotVisibilities.map((v) => {
    const checked = v === selected ? "checked" : "";
    const label = v === "visible" ? "表示する" : "表示しない";
    const value = v;
    return template({
      ROOT_CLASS,
      checked,
      label,
      value,
    });
  }).reduce((a, b) => a + b);
