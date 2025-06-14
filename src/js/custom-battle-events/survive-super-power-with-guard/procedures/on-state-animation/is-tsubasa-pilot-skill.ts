import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaPilotSkill」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaPilotSkill」
 */
export function isTsubasaPilotSkill(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player } = props;
  return (
    currentState.effect.name === "PilotSkillEffect" &&
    currentState.effect.invokerId === player.playerId
  );
}
