import {
  BattleControllerType,
  BattleControllerTypes,
} from "../../../td-scenes/battle/controller-type";
import battleControllerItemsTemplate from "./battle-controller-items.hbs";
import bigButtonDetailTemplate from "./big-button-detail.hbs";
import { ROOT_CLASS } from "./class-name";
import miniControllerDetailTemplate from "./mini-controller-detail.hbs";

/**
 * 戦闘画面コントローラーoptionのラベルを生成する
 * @param value 値
 * @return 生成結果
 */
const battleControllerTypeOptionLabel = (value: BattleControllerType) => {
  switch (value) {
    case "MiniController":
      return "ミニコントローラー";
    case "BigButton":
    default:
      return "おおきいボタン";
  }
};

/** おおきいボタン詳細 */
const bigButtonDetail = bigButtonDetailTemplate({ ROOT_CLASS });

/** accesskey参考文献URL */
const accesskeyReference =
  "https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/accesskey";

/** ミニコントローラー詳細 */
const miniControllerDetail = miniControllerDetailTemplate({
  ROOT_CLASS,
  accesskeyReference,
});

/**
 * 値に応じたコントローラー詳細を取得する
 * @param value 戦闘画面コントローラー
 * @return コントローラー詳細
 */
const getDetail = (value: BattleControllerType) => {
  switch (value) {
    case "MiniController":
      return miniControllerDetail;
    case "BigButton":
    default:
      return bigButtonDetail;
  }
};

/**
 * 戦闘画面コントローラーのラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @return 生成結果
 */
export const battleControllerTypeItems = (selected: BattleControllerType) =>
  BattleControllerTypes.map(
    (value) => {
      const label = battleControllerTypeOptionLabel(value);
      const detail = getDetail(value);
      const checked = value === selected ? "checked" : "";
      return battleControllerItemsTemplate({
        ROOT_CLASS,
        label,
        detail,
        checked,
      });
    },
  ).reduce((a, b) => a + b);
