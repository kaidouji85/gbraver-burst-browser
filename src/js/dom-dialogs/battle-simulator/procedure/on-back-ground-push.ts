import { PushDOM } from "../../../dom/push-dom";
import { BattleSimulatorProps } from "../props";

/**
 * 背景を押した際の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onBackGroundPush(props: BattleSimulatorProps, action: PushDOM) {
  const { exclusive, se, changeValue, closeDialog } = props;
  const { event } = action;

  event.preventDefault();
  event.preventDefault();

  exclusive.execute(async () => {
    se.play(changeValue);
    closeDialog.next();
  });
}
