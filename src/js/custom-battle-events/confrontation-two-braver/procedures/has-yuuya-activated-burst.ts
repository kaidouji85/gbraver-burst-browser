import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";

/**
 * ユウヤがバーストを発動したか否か
 * @param props イベントプロパティ
 * @return trueでユウヤがバーストを発動した
 */
export function hasYuuyaActivatedBurst(
  props: Readonly<CustomStateAnimation>,
): boolean {
  return (
    props.currentState.effect.name === "BurstEffect" &&
    props.currentState.effect.burstPlayer !== props.playerId
  );
}
