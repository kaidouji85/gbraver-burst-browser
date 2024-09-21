import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ガード2回目 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenSecondGuard = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `よし 確実に${wbr}ダメージが${wbr}蓄積して${wbr}きて${wbr}いるぞ`,
    );
  });
