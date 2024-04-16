import {
  PlayerSelectorType,
  PlayerSelectorTypes,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";
import PlayerSelectorTypeTemplate from "./player-selector-type.hbs";

/** ボタン設定 */
type ButtonConfig = {
  /** ラベル */
  label: string;
};

/** ボタン設定をあつめたもの */
export const configs: { [key in PlayerSelectorType]: ButtonConfig } = {
  open: {
    label: "オープン",
  },
  secret: {
    label: "シークレット",
  },
};

/**
 * ロボ、パイロット選択タイプの要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @return 生成結果
 */
export const playerSelectorTypeItems = (selected: PlayerSelectorType) =>
  PlayerSelectorTypes.map((value) => {
    const config = configs[value] ?? configs.open;
    const { label } = config;
    const checked = selected === value ? "checked" : "";
    return PlayerSelectorTypeTemplate({
      ROOT_CLASS,
      label,
      value,
      checked,
    });
  }).reduce((a, b) => a + b);
