import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectrProps } from "../props";

/**
 * クロージャが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: NetBattleSelectrProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.valueChange.sound.play();
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
}
