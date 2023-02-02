import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectrProps } from "../props";

/**
 * 背景が押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackgroundPush(
  props: NetBattleSelectrProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.sound.play();
    props.dialogClosed.next();
  });
}
