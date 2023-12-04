import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * チャプター「とどめをさすためにユウヤがスキルを発動する」ユウヤ叫び1
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCry1WhenYuuyaActivateSkillToFinish = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "ここまでよく生き延びた");
