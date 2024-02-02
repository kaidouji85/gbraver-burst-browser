import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    playerPilotOnlyShout(props, "Shinya", "ここで勝負をかけるッス");
  });
