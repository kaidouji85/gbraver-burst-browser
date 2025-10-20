import {
  PlayerPilotVisibilities,
  PlayerPilotVisibility,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";
import template from "./player-pilot-visibility-option.hbs";

/** 「visible」のオプション情報 */
const visible = {
  label: "表示する",
  description: `常にプレイヤー側のパイロット情報を表示します。`,
};

/** 「hidden」のオプション情報 */
const hidden = {
  label: "表示しない",
  description: `スキル未発動時にはプレイヤー側のパイロット情報を表示しません。ゲーム画面を動画配信する際に、視聴者に配信者が選択したパイロットを悟られません。 `,
};

/**
 * PlayerPilotVisibilityに応じたオプション情報を取得する
 * @param visibility プレイヤーパイロット表示設定
 * @returns 取得したオプション情報
 */
const getOptions = (visibility: PlayerPilotVisibility) => {
  switch (visibility) {
    case "hidden":
      return hidden;
    case "visible":
    default:
      return visible;
  }
};

/**
 * プレイヤーパイロット表示設定のラジオボタン要素HTMLを生成する
 * @param selected 初期に選択されているプレイヤーパイロット表示設定
 * @returns 生成結果
 */
export const playerPilotVisibilityOptions = (selected: PlayerPilotVisibility) =>
  PlayerPilotVisibilities.map((v) => {
    const checked = v === selected ? "checked" : "";
    const options = getOptions(v);
    const { label, description } = options;
    return template({
      ROOT_CLASS,
      checked,
      label,
      value: v,
      description,
    });
  }).reduce((a, b) => a + b);
