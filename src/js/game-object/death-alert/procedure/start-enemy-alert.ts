import { all } from "../../../animation/all";
import { changeColor } from "../animation/change-color";
import { changeOpacity } from "../animation/change-opacity";
import { ENEMY_DEATH_ALERT_COLOR } from "../color";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * 敵デスアラートを再生する
 * @param props プロパティ
 * @param duration ビネット表示にかかる時間（ミリ秒）
 */
export const startEnemyAlert = (
  props: DeathAlertProps,
  duration: number,
): void => {
  if (props.isPlaying) {
    return;
  }

  props.isPlaying = true;
  props.tweenGroup.update();
  props.tweenGroup.removeAll();
  all(
    changeOpacity(props.model, 1, duration),
    changeColor(props.model, ENEMY_DEATH_ALERT_COLOR, 0),
  ).play({ group: props.tweenGroup });
  props.se.play(props.sounds.benefitEffect);
};
