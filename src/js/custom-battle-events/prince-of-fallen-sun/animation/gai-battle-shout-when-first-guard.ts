import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ガード1回目 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenFirstGuard = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `やはり${wbr}牽制では${wbr}この程度${wbr}か`,
    );
  });
