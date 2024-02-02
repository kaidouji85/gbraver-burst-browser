import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ叫び 即死を避けるためにパイロットスキル発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillShoutToAvoidDeath = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    playerPilotOnlyShout(props, "Shinya", "ガイ まだ終わりじゃないッスよ");
  });
