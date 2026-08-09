import { all } from "../../../animation/all";
import { changeMargin } from "../animation/change-margin";
import { changeOpacity } from "../animation/change-opacity";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * 停止する
 * @param props プロパティ
 * @param duration ビネット非表示にかかる時間（ミリ秒）
 */
export const stop = (props: DeathAlertProps, duration: number): void => {
  if (!props.isPlaying) {
    return;
  }

  props.isPlaying = false;
  props.tweenGroup.update();
  props.tweenGroup.removeAll();
  all(
    changeOpacity(props.model, 0, duration),
    changeMargin(props.model, 0, duration),
  ).play({
    group: props.tweenGroup,
  });
  props.sounds.deathAlert.sound.stop();
};
