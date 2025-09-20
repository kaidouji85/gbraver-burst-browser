import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoPilotSkill」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoPilotSkill」
 */
export function isRaitoPilotSkill(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy } = props;
  return (
    currentState.effect.name === "PilotSkillEffect" &&
    currentState.effect.invokerId === enemy.playerId
  );
}
