import {
  PlayerSelectorType,
  PlayerSelectorTypes,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";
import OpenPlayerSelectorDetailTemplate from "./open-player-selector-detail.hbs";
import PlayerSelectorTypeTemplate from "./player-selector-type.hbs";
import SecretPlayerSelectorDetailTemplate from "./secret-player-selector-detail.hbs";

/** ボタン設定 */
type ButtonConfig = {
  /** ラベル */
  label: string;
  /** 詳細説明 */
  detail: string;
};

/** ボタン設定をあつめたもの */
export const configs: { [key in PlayerSelectorType]: ButtonConfig } = {
  open: {
    label: "オープン",
    detail: OpenPlayerSelectorDetailTemplate({ ROOT_CLASS }),
  },
  secret: {
    label: "シークレット",
    detail: SecretPlayerSelectorDetailTemplate({ ROOT_CLASS }),
  },
};

/**
 * ロボ、パイロット選択タイプの要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @returns 生成結果
 */
export const playerSelectorTypeItems = (selected: PlayerSelectorType) =>
  PlayerSelectorTypes.map((value) => {
    const config = configs[value] ?? configs.open;
    const { label, detail } = config;
    const checked = selected === value ? "checked" : "";
    return PlayerSelectorTypeTemplate({
      ROOT_CLASS,
      label,
      detail,
      value,
      checked,
    });
  }).reduce((a, b) => a + b);
