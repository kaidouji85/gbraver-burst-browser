import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectrProps } from "../props";

/**
 * プライベートマッチ（ホスト）が選択された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPrivateMatchHostSelect(
  props: NetBattleSelectrProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.sound.play();
    await pop(props.privateMatchHostButton, 1.02);
    props.privateMatchHostSelection.next();
  });
}
