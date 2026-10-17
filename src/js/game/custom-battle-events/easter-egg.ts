import { waitTime } from "../../event/wait/wait-time";
import { CustomBattleEventProps } from "../scenes/td-scenes/battle/custom-battle-event";

/**
 * イースターエッグ発見告知をポップアップ表示する
 * @param props プロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export const popUpEaasterEff = async (props: CustomBattleEventProps) => {
  await props.view.dom.easterEgg.show();
  await waitTime(2000);
  props.view.dom.easterEgg.hidden();
};
