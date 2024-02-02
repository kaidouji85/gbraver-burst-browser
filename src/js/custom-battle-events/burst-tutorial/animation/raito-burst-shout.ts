import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const raitoBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  process(() => {
    enemyPilotOnlyShout(props, "Raito", "ほないくで 大田高校のエース君");
  });