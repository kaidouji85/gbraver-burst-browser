import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ 戦闘 ユウヤがダメージを受けた
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackCryWhenYuuyaTakesDamage = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "あと一回直撃させれば 俺の勝ちッス");
