import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター「生き延びるためにユウヤがスキルを発動する」ユウヤ叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout2WhenYuuyaActivateSkillToSurvive = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", `やるな${wbr} シンヤ`);
  });
