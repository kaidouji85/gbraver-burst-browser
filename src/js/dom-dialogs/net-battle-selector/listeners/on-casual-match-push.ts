import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectrProps } from "../props";
import {pop} from "../../../dom/animation";

/**
 * カジュアルマッチボタンを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCasualMatchPush(
  props: NetBattleSelectrProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    await pop(props.casualMatchButton);
  });
}
