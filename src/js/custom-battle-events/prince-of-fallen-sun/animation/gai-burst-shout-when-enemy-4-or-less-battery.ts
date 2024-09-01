import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ バースト 叫び（敵のバッテリーが4以下）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBurstShoutWhenEnemy4OrLessBattery = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `隙を${wbr}見せたな Gブレイバー`);
  });
