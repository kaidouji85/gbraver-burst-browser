import { PilotSkillEffect } from "gbraver-burst-core";

import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { CustomStateAnimationProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout, playerPilotShout } from "../../pilot-shout";
import { getPilotSkillShout } from "./get-pilot-skill-shout";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimationProps>,
): Animate {
  if (props.currentState.effect.name !== "PilotSkillEffect") {
    return empty();
  }

  const pilotSkill: PilotSkillEffect = props.currentState.effect;
  const invokerPlayer = props.currentState.players.find(
    (p) => p.playerId === pilotSkill.invokerId,
  );
  if (!invokerPlayer) {
    return empty();
  }

  const isPilotSkillInvokerActive =
    props.currentState.effect.invokerId === props.currentState.activePlayerId;
  const shout = getPilotSkillShout(invokerPlayer, isPilotSkillInvokerActive);
  if (!shout) {
    return empty();
  }

  const isPlayerPilotSkillInvoker = pilotSkill.invokerId === props.playerId;
  const pilotShout = isPlayerPilotSkillInvoker
    ? playerPilotShout
    : enemyPilotShout;
  const { face, message } = shout;
  return onStart(() => {
    pilotShout(props, face, message);
  });
}
