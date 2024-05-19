import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { BattleSimulatorProps } from "../props";

/**
 * 閉じるアイコンがクリックされた際の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onCloserPush(props: BattleSimulatorProps, action: PushDOM) {
  const { closer, se, changeValue } = props;
  const { event } = action;

  event.stopPropagation();
  event.preventDefault();

  pop(closer);
  se.play(changeValue);
  props.closeDialog.next();
}
