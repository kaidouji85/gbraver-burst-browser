import { all } from "../../../animation/all";
import { changeColor } from "../animation/change-color";
import { changeMargin } from "../animation/change-margin";
import { changeOpacity } from "../animation/change-opacity";
import { PLAYER_DEATH_ALERT_COLOR } from "../color";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * プレイヤーデスアラートを再生する
 * @param props プロパティ
 * @param duration ビネット表示にかかる時間（ミリ秒）
 */
export const startPlayerAlert = (
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
    changeColor(props.model, PLAYER_DEATH_ALERT_COLOR, 0),
    changeMargin(props.model, 1, duration),
  ).play({ group: props.tweenGroup });
  props.se.loop(props.sounds.deathAlert);
};
