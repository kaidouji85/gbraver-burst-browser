import { Animate } from "../../../../animation/animate";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBurstShoutWhenEnemy4OrLessBattery } from "../../animation/gai-burst-shout-when-enemy-4-or-less-battery";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ バースト */
export const gaiBurst: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { currentState, playerId, enemyId } = props;
  const { effect } = currentState;
  const player = currentState.players.find(
    (player) => player.playerId === playerId,
  );

  if (
    effect.name === "BurstEffect" &&
    effect.burstPlayer === enemyId &&
    player &&
    player.armdozer.battery <= 4
  ) {
    result = gaiBurstShoutWhenEnemy4OrLessBattery(props);
  }

  return result;
};
