import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * ライト バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const raitoBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  enemyPilotCry(props, "Raito", "ほないくで 大田高校のエース君");
