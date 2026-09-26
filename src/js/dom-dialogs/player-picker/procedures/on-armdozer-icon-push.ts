import { PushDOM } from "../../../dom/push-dom";
import { ArmdozerIcon } from "../dom/armdozer-icon";
import { PlayerPickerDialogProps } from "../props";

/**
 * アームドーザアイコンが押されたときの処理
 * @param options オプション
 * @param options.props プレイヤーピッカーダイアログのプロパティ
 * @param options.armdozerIcon 押されたアームドーザアイコン
 * @param options.action 押下アクション
 */
export const onArmdozerIconPush = (options: {
  props: PlayerPickerDialogProps;
  armdozerIcon: ArmdozerIcon;
  action: PushDOM;
}) => {
  const { props, armdozerIcon, action } = options;
  action.event.preventDefault();
  action.event.stopPropagation();

  props.se.play(props.changeValueSound);
  props.selectedArmdozerId = armdozerIcon.armdozerId;
  props.armdozerIcons.forEach((icon) => {
    const isChecked = icon.armdozerId === armdozerIcon.armdozerId;
    icon.checked(isChecked);
    if (isChecked) {
      icon.pop();
    }
  });
};
