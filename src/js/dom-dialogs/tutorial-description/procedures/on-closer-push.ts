import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { TutorialDescriptionDialogProps } from "../props";

/**
 * クロージャーが押されたときの処理
 * @param options オプション
 */
export const onCloserPush = (options: {
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
    await pop(props.closer, 1.3);
    props.closeNotifier.next();
  });
};
