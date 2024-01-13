import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ叫び 即死を避けるためにバースト発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstCryToAvoidDeath = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Shinya", "シンブレイバー 俺に力を貸してくれッス");
