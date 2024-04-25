import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター「とどめをさすためにユウヤがスキルを発動する」ユウヤ叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout2WhenYuuyaActivateSkillToFinish = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", "だが これで終わりだ");
  });
