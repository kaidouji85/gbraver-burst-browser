import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ叫び 即死を避けるためにパイロットスキル発動
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillShoutToAvoidDeath = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "ガイ まだ終わりじゃないッスよ");
  });
