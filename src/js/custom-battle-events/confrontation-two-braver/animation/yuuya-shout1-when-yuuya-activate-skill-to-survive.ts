import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター「生き延びるためにユウヤがスキルを発動する」ユウヤ叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout1WhenYuuyaActivateSkillToSurvive = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", "俺にパイロットスキルを使わせるとは");
  });
