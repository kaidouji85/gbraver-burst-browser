import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ叫び 即死を避けるためにバースト発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstShoutToAvoidDeath = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "シンブレイバー バーストON！！");
