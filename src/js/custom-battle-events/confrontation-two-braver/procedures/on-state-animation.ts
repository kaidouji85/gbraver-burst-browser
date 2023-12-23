import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { isEnemyAdvantage } from "../../is-enemy-advantage";
import { isEvenMatch } from "../../is-even-match";
import { isPlayerAdvantage } from "../../is-player-advantage";
import { separatePlayersFromCurrentState } from "../../separate-players";
import { shinyaPilotSkillWhenEvenMatch } from "../animation/shinya-pilot-skill-when-even-match";
import { shinyaPilotSkillWhenShinyaHasAdvantage } from "../animation/shinya-pilot-skill-when-shinya-has-advantage";
import { shinyaPilotSkillWhenYuuyaHasAdvantage } from "../animation/shinya-pilot-skill-when-yuuya-has-advantage";
import { yuuyaCry1WhenEvenMatch } from "../animation/yuuya-cry1-when-even-match";
import { yuuyaCry1WhenShinyaHasAdvantage } from "../animation/yuuya-cry1-when-shinya-has-advantage";
import { yuuyaCry1WhenYuuyaActivateSkillToFinish } from "../animation/yuuya-cry1-when-yuuya-activate-skill-to-finish";
import { yuuyaCry1WhenYuuyaActivateSkillToSurvive } from "../animation/yuuya-cry1-when-yuuya-activate-skill-to-survive";
import { yuuyaCry1WhenYuuyaHasAdvantage } from "../animation/yuuya-cry1-when-yuuya-has-advantage";
import { yuuyaCry2WhenEvenMatch } from "../animation/yuuya-cry2-when-even-match";
import { yuuyaCry2WhenShinyaHasAdvantage } from "../animation/yuuya-cry2-when-shinya-has-advantage";
import { yuuyaCry2WhenYuuyaActivateSkillToFinish } from "../animation/yuuya-cry2-when-yuuya-activate-skill-to-finish";
import { yuuyaCry2WhenYuuyaActivateSkillToSurvive } from "../animation/yuuya-cry2-when-yuuya-activate-skill-to-survive";
import { yuuyaCry2WhenYuuyaHasAdvantage } from "../animation/yuuya-cry2-when-yuuya-has-advantage";
import { ConfrontationTwoBraverProps } from "../props";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & ConfrontationTwoBraverProps>,
): Animate {
  const isEnemyBurstActivated =
    props.currentState.effect.name === "BurstEffect" &&
    props.currentState.effect.burstPlayer !== props.playerId;
  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    isEnemyBurstActivated
  ) {
    return yuuyaCry1WhenShinyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenShinyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "YuuyaHasAdvantage" &&
    isEnemyBurstActivated
  ) {
    return yuuyaCry1WhenYuuyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "YuuyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenYuuyaHasAdvantage(props);
  }

  if (props.state.chapter.type === "EvenMatch" && isEnemyBurstActivated) {
    return yuuyaCry1WhenEvenMatch(props);
  }

  if (
    props.state.chapter.type === "EvenMatch" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenEvenMatch(props);
  }

  if (
    props.state.chapter.type === "YuuyaActivateSkillToSurvive" &&
    props.currentState.effect.name === "PilotSkillEffect"
  ) {
    return yuuyaCry1WhenYuuyaActivateSkillToSurvive(props);
  }

  if (
    props.state.chapter.type === "YuuyaActivateSkillToSurvive" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenYuuyaActivateSkillToSurvive(props);
  }

  if (
    props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
    props.currentState.effect.name === "PilotSkillEffect"
  ) {
    return yuuyaCry1WhenYuuyaActivateSkillToFinish(props);
  }

  if (
    props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenYuuyaActivateSkillToFinish(props);
  }

  const isPlayerSkillActivated =
    props.currentState.effect.name === "PilotSkillEffect" &&
    props.currentState.effect.invokerId === props.playerId;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  if (
    isPlayerSkillActivated &&
    separatedPlayers &&
    isPlayerAdvantage(separatedPlayers)
  ) {
    return shinyaPilotSkillWhenShinyaHasAdvantage(props);
  }

  if (
    isPlayerSkillActivated &&
    separatedPlayers &&
    isEnemyAdvantage(separatedPlayers)
  ) {
    return shinyaPilotSkillWhenYuuyaHasAdvantage(props);
  }

  if (
    isPlayerSkillActivated &&
    separatedPlayers &&
    isEvenMatch(separatedPlayers)
  ) {
    return shinyaPilotSkillWhenEvenMatch(props);
  }

  return empty();
}
