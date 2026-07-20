import { opacity } from "../animation/opacity";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * 再生する
 * @param props プロパティ
 * @param duration ビネット表示にかかる時間（ミリ秒）
 */
export const play = (props: DeathAlertProps, duration: number): void => {
  if (props.isPlaying) {
    return;
  }

  props.isPlaying = true;
  props.tweenGroup.update();
  props.tweenGroup.removeAll();
  opacity(props.model, 1, duration).play({ group: props.tweenGroup });
  props.se.loop(props.sounds.deathAlert);
};
