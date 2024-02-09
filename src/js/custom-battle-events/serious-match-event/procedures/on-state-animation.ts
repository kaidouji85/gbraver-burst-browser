import { PilotSkillEffect } from "gbraver-burst-core";

import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout, playerPilotShout } from "../../pilot-shout";
import { getPilotSkillShout } from "./get-pilot-skill-shout";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation>,
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

  const isPlayerInvokePilotSkill = pilotSkill.invokerId === props.playerId;
  const shoutFunc = isPlayerInvokePilotSkill
    ? playerPilotShout
    : enemyPilotShout;
  const { face, message } = shout;
  return onStart(() => {
    shoutFunc(props, face, message);
  });
}
