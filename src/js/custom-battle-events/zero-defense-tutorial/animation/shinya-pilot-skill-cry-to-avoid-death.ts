import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ叫び 即死を避けるためにパイロットスキル発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillCryToAvoidDeath = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "ガイ まだ終わりじゃないッスよ");
