import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout } from "../../pilot-shout";

/**
 * ライト バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const raitoBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  enemyPilotShout(props, "Raito", "ほないくで 大田高校のエース君");
