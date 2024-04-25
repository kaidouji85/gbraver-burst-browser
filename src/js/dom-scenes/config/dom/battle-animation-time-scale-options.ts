import {
  BattleAnimationTimeScale,
  BattleAnimationTimeScales,
} from "../../../game/config/browser-config";
import battleAnimationTimeScaleTemplate from "./battle-animation-time-scale.hbs";
import { ROOT_CLASS } from "./class-name";

/**
 * 戦闘アニメ再生速度のラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘アニメ再生速度
 * @returns 生成結果
 */
export const battleAnimationTimeScaleOptions = (
  selected: BattleAnimationTimeScale,
) =>
  BattleAnimationTimeScales.map((value) => {
    const checked = value === selected ? "checked" : "";
    const magnification = Math.floor(1 / value);
    return battleAnimationTimeScaleTemplate({
      ROOT_CLASS,
      value,
      checked,
      magnification,
    });
  }).reduce((a, b) => a + b);
