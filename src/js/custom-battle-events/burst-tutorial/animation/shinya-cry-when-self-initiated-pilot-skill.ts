import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {playerPilotCry} from "../../pilot-cry";

/** シンヤ叫び 自発的にパイロットスキル発動 */
export const shinyaCryWhenSelfInitiatedPilotSkill = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "先輩だからって 遠慮しないッスよ");
