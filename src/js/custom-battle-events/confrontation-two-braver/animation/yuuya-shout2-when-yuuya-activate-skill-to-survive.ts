import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター「生き延びるためにユウヤがスキルを発動する」ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout2WhenYuuyaActivateSkillToSurvive = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", "やるな シンヤ");
  });
