import {
  BattleControllerType,
  BattleControllerTypes,
} from "../../../td-scenes/battle/controller-type";
import battleControllerTemplate from "./battle-controller-type.hbs";
import bigButtonDetailTemplate from "./big-button-detail.hbs";
import { ROOT_CLASS } from "./class-name";
import miniControllerDetailTemplate from "./mini-controller-detail.hbs";

/** accesskey参考文献URL */
const accesskeyReference =
  "https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/accesskey";


/** ボタン設定 */
type ButtonConfig = {
  /** ラベル文言 */
  label: string;
  /** 詳細欄に表示するHTML */
  detail: string;
};

/** ボタン設定をあつめたもの */
const configs: {[key in BattleControllerType]: ButtonConfig} = {
  MiniController: {
    label: "ミニコントローラー",
    detail: miniControllerDetailTemplate({
      ROOT_CLASS,
      accesskeyReference,
    }),
  },
  BigButton: {
    label: "おおきいボタン",
    detail: bigButtonDetailTemplate({ ROOT_CLASS }),
  },
};

/**
 * 戦闘画面コントローラーのラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @return 生成結果
 */
export const battleControllerTypeItems = (selected: BattleControllerType) =>
  BattleControllerTypes.map((value) => {
    const config = configs[value] ?? configs.BigButton;
    const { label, detail } = config;
    const checked = value === selected ? "checked" : "";
    return battleControllerTemplate({
      ROOT_CLASS,
      value,
      label,
      detail,
      checked,
    });
  }).reduce((a, b) => a + b);
