import { PushDOM } from "../../../dom/push-dom";
import { PilotIcon } from "../dom/pilot-icon";
import { PlayerPickerDialogProps } from "../props";

/**
 * 「パイロット」アイコンが押されたときの処理
 * @param options オプション
 * @param options.props プレイヤーピッカーダイアログのプロパティ
 * @param options.pilotIcon 押されたパイロットアイコン
 * @param options.action 押下アクション
 */
export const onPilotIconPush = (options: {
  props: PlayerPickerDialogProps;
  pilotIcon: PilotIcon;
  action: PushDOM;
}) => {
  const { props, pilotIcon, action } = options;
  action.event.preventDefault();
  action.event.stopPropagation();

  props.se.play(props.changeValueSound);
  props.selectedPilotId = pilotIcon.pilotId;
  props.pilotIcons.forEach((icon) => {
    const isChecked = icon.pilotId === pilotIcon.pilotId;
    icon.checked(isChecked);
    if (isChecked) {
      icon.pop();
    }
  });
};
