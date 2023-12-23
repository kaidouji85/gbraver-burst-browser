import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation & ConfrontationTwoBraverProps>,
): Animate {
  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  if (
    props.state.chapter.type === "YuuyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  if (
    props.state.chapter.type === "EvenMatch" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  if (
    props.state.chapter.type === "YuuyaActivateSkillToSurvive" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  if (
    props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  if (
    props.currentState.effect.name === "PilotSkillEffect" &&
    props.currentState.effect.invokerId === props.playerId
  ) {
    return process(() => {
      props.view.dom.playerCryMessageWindow.visible(false);
    });
  }

  return empty();
}
