import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ パイロットスキル叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiPilotSkill = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Gai", "俺の根性 見せてやる");
  });
