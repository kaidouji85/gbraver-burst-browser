import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター「とどめをさすためにユウヤがスキルを発動する」ユウヤ叫び1
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout2WhenYuuyaActivateSkillToFinish = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    enemyPilotOnlyShout(props, "Yuuya", "だが これで終わりだ");
  });
