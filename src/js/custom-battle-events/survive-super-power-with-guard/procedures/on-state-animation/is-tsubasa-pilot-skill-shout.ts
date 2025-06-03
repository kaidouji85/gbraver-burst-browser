import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaPilotSkillShout」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaPilotSkillShout」
 */
export function isTsubasaPilotSkillShout(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player } = props;
  return (
    currentState.effect.name === "PilotSkillEffect" &&
    currentState.effect.invokerId === player.playerId
  );
}
