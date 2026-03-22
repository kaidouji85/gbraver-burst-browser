import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleSelectorDialogProps } from "../props";

export const onLocalBattleGuestPushed = (
  props: LocalBattleSelectorDialogProps,
  action: PushDOM,
): void => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButtonSound);
    await pop(props.localBattleGuestButton, 1.02);
    props.localBattleGuestSelection.next();
  });
};
