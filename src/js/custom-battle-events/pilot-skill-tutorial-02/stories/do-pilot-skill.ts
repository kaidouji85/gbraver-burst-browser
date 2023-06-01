import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";

/**
 * パイロットスキル発動の推奨
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function doPilotSkill(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  return;
}