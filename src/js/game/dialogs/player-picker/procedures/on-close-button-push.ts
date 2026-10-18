import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { PlayerPickerDialogProps } from "../props";

/**
 * 閉じるボタンが押されたときの処理
 * @param options オプション
 * @param options.props プレイヤーピッカーダイアログのプロパティ
 * @param options.action 押下アクション
 */
export const onCloseButtonPush = (options: {
  props: PlayerPickerDialogProps;
  action: PushDOM;
}) => {
  const { props, action } = options;
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.pushButtonSound);
    await pop(props.closeButton);
    props.closeSubject.next();
  });
};
