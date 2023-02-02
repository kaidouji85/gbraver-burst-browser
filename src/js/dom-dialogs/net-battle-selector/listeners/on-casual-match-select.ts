import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectrProps } from "../props";

/**
 * カジュアルマッチが選択された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCasualMatchSelect(
  props: NetBattleSelectrProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.sound.play();
    await pop(props.casualMatchButton, 1.05);
    props.casualMatchSelection.next();
  });
}
