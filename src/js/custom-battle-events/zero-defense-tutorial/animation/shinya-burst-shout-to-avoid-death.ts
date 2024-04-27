import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ叫び 即死を避けるためにバースト発動
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaBurstShoutToAvoidDeath = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "シンブレイバー バーストON！！");
  });
