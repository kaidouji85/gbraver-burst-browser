import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";

/**
 * ガイのパイロットスキル発動か否かを判定する
 * @param props イベントプロパティ
 * @return trueでツバサ先輩がスキル発動
 */
export function isPilotSkillActivatedByGai(
  props: Readonly<CustomStateAnimation>,
): boolean {
  return (
    props.currentState.effect.name === "PilotSkillEffect" &&
    props.currentState.effect.invokerId === props.playerId
  );
}
