import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillWhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", `ここで${wbr}勝負を${wbr}かけるッス`);
  });
