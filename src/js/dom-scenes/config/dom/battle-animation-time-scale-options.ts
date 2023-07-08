import {
  BattleAnimationTimeScale,
  BattleAnimationTimeScales,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";

/**
 * 戦闘アニメ再生速度のラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘アニメ再生速度
 * @return 生成結果
 */
export const battleAnimationTimeScaleOptions = (
  selected: BattleAnimationTimeScale,
) =>
  BattleAnimationTimeScales.map(
    (value) => `
    <label class="${ROOT_CLASS}__battle-animation-time-scale-label">
      <input class="${ROOT_CLASS}__battle-animation-time-scale-radio"
        name="battle-animation-time-scale"
        type="radio"
        value="${value}"
        ${value === selected ? "checked" : ""}
      >
      ${Math.floor(1 / value)}倍
    </label>
  `,
  ).reduce((a, b) => a + b);
