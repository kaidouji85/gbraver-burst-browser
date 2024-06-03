import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { BattleSimulatorProps } from "../props";

/**
 * 閉じるアイコンがクリックされた際の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onCloserPush(props: BattleSimulatorProps, action: PushDOM) {
  const { exclusive, closer, se, changeValue } = props;
  const { event } = action;

  event.stopPropagation();
  event.preventDefault();

  exclusive.execute(async () => {
    se.play(changeValue);
    await pop(closer, 1.3);
    props.closeDialog.next();
  });
}
