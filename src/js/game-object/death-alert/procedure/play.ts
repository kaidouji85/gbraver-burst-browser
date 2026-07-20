import { all } from "../../../animation/all";
import { changeColor } from "../animation/change-color";
import { changeOpacity } from "../animation/change-opacity";
import { Color } from "../color";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * 再生する
 * @param props プロパティ
 * @param duration ビネット表示にかかる時間（ミリ秒）
 * @param color ビネットの色
 */
export const play = (
  props: DeathAlertProps,
  duration: number,
  color: Color,
): void => {
  if (props.isPlaying) {
    return;
  }

  props.isPlaying = true;
  props.tweenGroup.update();
  props.tweenGroup.removeAll();
  all(
    changeOpacity(props.model, 1, duration),
    changeColor(props.model, color, 0),
  ).play({ group: props.tweenGroup });
  props.se.loop(props.sounds.deathAlert);
};
