import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * シンヤ 戦闘 ユウヤがダメージを受けた
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackCryWhenYuuyaTakesNoDamage = (
  props: Readonly<CustomBattleEventProps>,
) => switchPlayerPilotCry(props, "Shinya", "あと一回直撃させれば 俺の勝ちッス");
