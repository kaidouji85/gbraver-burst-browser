import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { TutorialDescriptionDialogProps } from "../props";

/**
 * 閉じるボタンがが押されたときの処理
 * @param options オプション
 */
export const onCloseButtonPush = (options: {
  /** ダイアログのプロパティ */
  props: Readonly<TutorialDescriptionDialogProps>;
  /** アクション */
  action: Readonly<PushDOM>;
}) => {
  const { props, action } = options;
  action.event.stopPropagation();
  action.event.preventDefault();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    await pop(props.closeButton);
    props.closeNotifier.next();
  });
};
