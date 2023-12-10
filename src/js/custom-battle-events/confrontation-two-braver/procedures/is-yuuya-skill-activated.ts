import { StateUpdateStarted } from "../../../td-scenes/battle/custom-battle-event";

/**
 * ユウヤがスキルを発動したかどうかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @param update ゲームステート更新情報
 * @return ユウヤがスキルを発動したかどうか
 */
export function isYuuyaSkillActivated(
  props: Readonly<StateUpdateStarted>,
): boolean {
  return props.update.some(
    (state) =>
      state.effect.name === "PilotSkillEffect" &&
      state.effect.invokerId !== props.playerId,
  );
}