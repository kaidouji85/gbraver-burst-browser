import {
  BattleControllerType,
  BattleControllerTypes,
} from "../../../td-scenes/battle/controller-type";
import { ROOT_CLASS } from "./class-name";

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
      return "ボタン";
  }
};

/**
 * 戦闘画面コントローラーのoption要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @return 生成結果
 */
export const battleControllerTypeOptions = (selected: BattleControllerType) =>
  BattleControllerTypes.map(
    (value) => `
    <label class="${ROOT_CLASS}__battle-controller-type-label">
      <input class="${ROOT_CLASS}__battle-controller-type-radio"
        name="battle-controller-type"
        type="radio"
        value="${value}"
        ${value === selected ? "checked" : ""}
      >
        ${battleControllerTypeOptionLabel(value)}
      </input>
    </label>  
  `
  ).reduce((a, b) => a + b);
