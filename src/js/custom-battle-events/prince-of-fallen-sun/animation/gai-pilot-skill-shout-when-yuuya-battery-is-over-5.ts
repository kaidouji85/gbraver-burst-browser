import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ パイロットスキル（ユウヤのバッテリーが5以上） 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiPilotSkillShoutWhenYuuyaBatteryIsOver5 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `バッテリーゲージが${wbr}8だと`);
  });
