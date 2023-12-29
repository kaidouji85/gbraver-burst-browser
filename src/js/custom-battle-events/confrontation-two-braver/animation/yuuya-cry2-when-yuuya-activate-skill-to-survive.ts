import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * チャプター「生き延びるためにユウヤがスキルを発動する」ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCry2WhenYuuyaActivateSkillToSurvive = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "やるな シンヤ");
