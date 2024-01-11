import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * ライト カウンター成功 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const raitoBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Raito", "かかったな 大田高校のエース君");
