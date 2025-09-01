import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { StatusDialogProps } from "../props";

/**
 * クローザーが押されたときの処理
 * @param options オプション
 */
export const onCloserPush = (options: {
  /** ステータスダイアログのプロパティ */
  props: StatusDialogProps;
  /** アクション */
  action: PushDOM;
}): void => {
  const { props, action } = options;
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    pop(props.closer);
  });
};
