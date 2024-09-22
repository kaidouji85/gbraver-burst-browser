import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ミス 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenMiss = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `やはり${wbr}牽制には${wbr}当たらんか`,
    );
  });
