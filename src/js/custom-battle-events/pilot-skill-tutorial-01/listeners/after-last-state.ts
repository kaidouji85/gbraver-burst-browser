import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { introduction } from "../../battery-system-tutorial/stories/introduction";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function afterLastState(
  props: Readonly<LastState>
): Promise<void> {
  await introduction(props);
}