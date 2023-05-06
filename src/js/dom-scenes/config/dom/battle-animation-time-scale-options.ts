import {
  BattleAnimationTimeScale,
  BattleAnimationTimeScales,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";

/**
 * 戦闘アニメ再生速度のoption要素HTMLを生成する
 * @param selected 選択中の戦闘アニメ再生速度
 * @return 生成結果
 */
export const battleAnimationTimeScaleOptions = (
  selected: BattleAnimationTimeScale
) =>
  BattleAnimationTimeScales.map(
    (value) => `
    <option class="${ROOT_CLASS}__battle-animation-time-scale-option"
      value="${value}"
      ${value === selected ? "selected" : ""}
    >
      ${Math.floor(1 / value)}倍
    </option>
  `
  ).reduce((a, b) => a + b);
