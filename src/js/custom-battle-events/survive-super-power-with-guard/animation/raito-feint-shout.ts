import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト フェイント 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoFeintShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `念のために${wbr}バッテリーを${wbr}温存や`,
    );
  });
