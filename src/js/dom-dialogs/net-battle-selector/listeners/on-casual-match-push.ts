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
    props.pushButton.sound.play();
    await pop(props.casualMatchButton, 1.05);
    props.selectCasualMatch.next();
  });
}
