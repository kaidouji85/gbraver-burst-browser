import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ 戦闘 ユウヤがダメージを受けた
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackShoutWhenYuuyaTakesDamage = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "あと一回直撃させれば 俺の勝ちッス");
