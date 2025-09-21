import { PushDOM } from "../../../dom/push-dom";
import { StatusDialogProps } from "../props";

/**
 * バックグラウンド要素が押されたときの処理
 * @param options オプション
 */
export function onBackGroundPush(options: {
  /** ステータスダイアログのプロパティ */
  props: StatusDialogProps;
  /** アクション */
  action: PushDOM;
}) {
  const { props, action } = options;

  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    props.closeNotifier.next();
  });
}
